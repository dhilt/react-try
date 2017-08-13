const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

const DEV_DELAY = 500

const ARTICLES = {
  defaultCount: 10,
  dashboardCount: 6,
  dashboardTextCut: 150
}

let ArticlesController = {

  getArticleById: (req) =>
    new Promise((resolve, reject) => {
      // params validation
      const idArticle = Number(req.params.id)
      const token = req.headers.authorization
      if (!idArticle) {
        throw `Can't get article. Bad paramaters (id)`
      }
      if (isNaN(idArticle) || idArticle <= 0) {
        throw `Can't get article. No valid id`
      }
      return resolve({ token, idArticle })
    })
    // take article
    .then(params =>
      db.get('SELECT * FROM Article WHERE Article.id = ?', params.idArticle).then(
        result => Promise.resolve({ token: params.token, article: result }),
        err => { throw `Can't get article. Database error (select)` }
      )
    )
    // take article rate
    .then(data => {
      const article = data.article
      const token = data.token
      return db.all('SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = -1 UNION ALL SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = 1', { $id: article.id }).then(
        result => {
          article.rateDown = 0 || result[0]['COUNT(userId)']
          article.rateUp = 0 || result[1]['COUNT(userId)']
          return Promise.resolve({ article, token })
        },
        err => { throw `Can't take articles rate. Database error (select)` }
      )
    })
    // take user vote, if he is
    .then(data => {
      if (!data.token) {
        return Promise.resolve(data)
      } else {
        return AuthHelper.doAuthorize(data.token).then(user =>
          db.get('SELECT value FROM Votes WHERE id = ? AND userId = ? AND type = 1', [Number(data.article.id), user.id]).then(
            result => Promise.resolve({ article: data.article, rateUser: result ? result.value : null }),
            err => { throw `Can't take vote. Database error (select)` }
          )
        )
      }
    }),

  getArticles: (req) =>
    new Promise((resolve, reject) => {
      // Collect params
      let params = {}
      params.dashboard = req.query.hasOwnProperty('dashboard')
      params.count = Number(req.query.count) || ARTICLES.defaultCount
      params.offset = Number(req.query.offset) || 0
      params.title = req.query.title ? '%' + req.query.title + '%' : '%%'
      params.author = req.query.author ? '%' + req.query.author + '%' : '%%'
      params.dateFrom = req.query.dateFrom ? req.query.dateFrom + 'T00:00:00' : '1970-01-01'
      params.dateTo = req.query.dateTo ? req.query.dateTo + 'T23:59:59' : 'date("now")'
      // validate date
      if (params.dateTo !== 'date("now")' && !Date.parse(params.dateTo)) {
        throw `Bad parameters. Invalid dateTo.`
      }
      if (params.dateFrom !== '1970-01-01' && !Date.parse(req.query.dateFrom)) {
        throw `Bad parameters. Invalid dateFrom.`
      }
      let orderBy = 'createdAt'
      let orderDir = 'DESC'
      params.ordering = (orderBy ? ' ORDER BY ' + orderBy + ' ' : '') + (orderBy && orderDir ? orderDir : '')
      if (params.dashboard) {
        params.count = ARTICLES.dashboardCount
      }
      return resolve(params)
    })
    // get articles
    .then(params =>
      db.all('SELECT * FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ' + params.ordering + ' LIMIT ? OFFSET ?',
             [params.author, params.title, params.dateFrom, params.dateTo, params.count, params.offset]).then(
        rows => {
          if (params.dashboard) {
            rows.forEach(item =>
              item.text = item.text.slice(0, ARTICLES.dashboardTextCut)
            )
          }
          return Promise.resolve({ params, rows })
        },
        err => { throw `Can't get articles. Database error (select)` }
      )
    )
    // get articles total
    .then(data => {
      const params = data.params
      const articles = data.rows
      return db.get('SELECT COUNT(id) FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ', [params.author, params.title, params.dateFrom, params.dateTo]).then(
        result => Promise.resolve({ articles, total: result['COUNT(id)'] }),
        err => { throw `Can't get articles. Database error (select)`}
      )
    }),

  createArticle: (req) =>
    AuthHelper.doAuthorize(req.headers.authorization)
    // params validation
    .then(user => {
      if (user.id !== 1) {
        throw `Access error`
      }
      const article = req.body.article
      if (!article) {
        throw `Can't create. No new article.`
      }
      if (!article.text) {
        throw `Can't create. No text.`
      }
      if (!article.title) {
        throw `Can't create. No title.`
      }
      if (!article.createdAt) {
        throw `Can't create. No article date.`
      }
      if (!article.image) {
        throw `Can't create. No image.`
      }
      if (!article.description) {
        throw `Can't create. No description.`
      }
      return Promise.resolve({ article, user })
    })
    // find new id article
    .then(params =>
      db.get('SELECT max(id) FROM Article').then(
        result => Promise.resolve(Object.assign({newId: result['max(id)']}, params)),
        err => { throw `Can't create. Database error (select new id)` }
      )
    )
    // create new article
    .then(data => {
      const article = data.article
      const user = data.user
      const newId = Number(data.newId) + 1
      article.id = newId
      article.userId = user.id
      article.userName = user.login
      return db.run('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [newId, article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login]).then(
        result => Promise.resolve(article),
        err => { throw `Can't create. Database error (insert)` }
      )
    }),

  updateArticle: (req) =>
    AuthHelper.doAuthorize(req.headers.authorization)
    // params validation
    .then(user => {
      if (user.id !== 1) {
        throw `Access error!`
      }
      const idArticle = Number(req.params.id),
            article = req.body.article
      article.userId = Number(article.userId)
      article.id = Number(article.id)
      if (isNaN(idArticle) || idArticle <= 0) {
        throw `Can't update. Bad entity param (id)`
      }
      if (!article) {
        throw `Can't update. No new article.`
      }
      if (!article.userId) {
        throw `Can't update. No author id.`
      }
      if (isNaN(article.userId) || article.userId <= 0) {
        throw `Can't update. Bad entity param (userId)`
      }
      if (!article.text) {
        throw `Can't update. No text.`
      }
      if (!article.userName) {
        throw `Can't update. No user name.`
      }
      if (!article.title) {
        throw `Can't update. No title.`
      }
      if (!article.id) {
        throw `Can't update. No id article.`
      }
      if (isNaN(article.id) || article.id <= 0) {
        throw `Can't update. Bad entity param (id)`
      }
      if (!article.createdAt) {
        throw `Can't update. No article date.`
      }
      if (!article.image) {
        throw `Can't update. No image.`
      }
      if (!article.description) {
        throw `Can't update. No description.`
      }
      return Promise.resolve({ article, idArticle, user })
    })
    // search for existed article
    .then(params =>
      db.get('SELECT * FROM Article WHERE id = ?', params.idArticle).then(
        result => {
          if (!result) {
            throw `Can't update. Article with this id doesn't exist`
          }
          return Promise.resolve(params)
        },
        err => { throw `Can't update. Database error.` }
      )
    )
    // process article update
    .then(data => {
      const idArticle = data.idArticle
      const article = data.article
      const user = data.user
      return db.run('UPDATE Article SET title = ?, text = ?, description = ?, createdAt = ?, image = ?, userId = ?, userName = ? WHERE id = ?',
             [article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login, idArticle]).then(
        result => Promise.resolve(article),
        err => { throw `Can't update. Database error (update)` }
      )
    }),

  deleteArticle: (req) =>
    AuthHelper.doAuthorize(req.headers.authorization)
    // params validation
    .then(user => {
      if (user.id !== 1) {
        throw `Access error!`
      }
      const idArticle = Number(req.params.id)
      if (isNaN(idArticle) || idArticle <= 0) {
        throw `Can't delete. Bad entity param (id)`
      }
      return Promise.resolve(idArticle)
    })
    // search for existed article
    .then(idArticle =>
      db.get('SELECT * FROM Article WHERE id = ?', idArticle).then(
        result => {
          if (!result) {
            throw `Can't delete. Article doesn't exist`
          }
          return Promise.resolve(idArticle)
        },
        err => { throw `Can't delete. Database error` }
      )
    )
    // process params delete
    .then(idArticle =>
      db.run('DELETE FROM Article WHERE id = ?', idArticle).then(
        result => Promise.resolve('Article was deleted.'),
        err => { throw `Can't delete. Database error.` }
      )
    )
}

module.exports = ArticlesController
