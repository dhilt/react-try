const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

const DEV_DELAY = 500

const ARTICLES = {
  defaultCount: 10,
  dashboardCount: 6,
  dashboardTextCut: 150
}

let ArticlesController = {

  getArticleById: (req) => new Promise((resolve, reject) => {
    const id = Number(req.params.id),
          token = req.headers.authorization
    if (!id) {
      return reject('Bad parameters.')
    }
    if (isNaN(id) || id <= 0) {
      return reject('Bad parameters. (2)')
    }
    db.get('SELECT * FROM Article WHERE Article.id = ?', id, (err, article) => {
      if (err) {
        console.log(err)
        return reject('Database error.')
      }
      if (!article) {
        return reject('Article doesn\'t exist')
      }
      db.all('SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = -1 UNION ALL SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = 1', { $id: id }, (err, rate) => {
        article.rateDown = 0 || rate[0]['COUNT(userId)']
        article.rateUp = 0 || rate[1]['COUNT(userId)']
        if (!token) {
          return resolve({ article: article })
        } else {
          AuthHelper.doAuthorize(token).then(user => {
            db.get('SELECT value FROM Votes WHERE id = ? AND userId = ? AND type = 1', [id, user.id], (err, voteValue) => {
              if (err) {
                return reject('Database error.')
              }
              return resolve({ article: article, rateUser: voteValue ? voteValue.value : null })
            })
          })
        }
      })
    })
  }),

  getArticles: (req) => new Promise((resolve, reject) => {
    const dashboard = req.query.hasOwnProperty('dashboard')
    let count = Number(req.query.count) || ARTICLES.defaultCount
    const offset = Number(req.query.offset) || 0
    const title = req.query.title ? '%' + req.query.title + '%' : '%%'
    const author = req.query.author ? '%' + req.query.author + '%' : '%%'
    const dateFrom = req.query.dateFrom ? req.query.dateFrom + 'T00:00:00' : '1970-01-01'
    const dateTo = req.query.dateTo ? req.query.dateTo + 'T23:59:59' : 'date("now")'
    const orderBy = 'createdAt'
    const orderDir = 'DESC'
    if (dashboard) {
      count = ARTICLES.dashboardCount
    }
    const ordering = (orderBy ? ' ORDER BY ' + orderBy + ' ' : '') + (orderBy && orderDir ? orderDir : '')
    db.all('SELECT * FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ' + ordering + ' LIMIT ? OFFSET ?', [author, title, dateFrom, dateTo, count, offset], (err, rows) => {
      if (err)
        return reject(err)
      if (dashboard) {
        // режем текст на 150 символов
        rows.forEach(item =>
          item.text = item.text.slice(0, ARTICLES.dashboardTextCut)
        )
      }
      db.get('SELECT COUNT(id) FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ', [author, title, dateFrom, dateTo], (err, total) => {
        setTimeout(() => resolve({ articles: rows, total: total['COUNT(id)'] }), DEV_DELAY)
      })
    })
  }),

  createArticle: (req) => new Promise((resolve, reject) => {
    AuthHelper.doAuthorize(req.headers.authorization).then(user => {
      const article = req.body.article
      if (!article || !article.createdAt || !article.title || !article.description || !article.image || !article.text) {
        return reject('Missed some data!')
      }
      db.get('SELECT max(id) FROM Article', (err, newId) => {
        if (err) {
          return reject(err)
        }
        const stmt = db.prepare('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        stmt.run(newId['max(id)'] + 1, article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login)
        stmt.finalize();
        return resolve({ id: newId['max(id)'] + 1, title: article.title, text: article.text, description: article.description, createdAt: new Date(article.createdAt).toISOString(), image: article.image, userId: user.id, userName: user.login })
      })
    },
    error => reject(error))
  }),

  updateArticle: (req) => new Promise((resolve, reject) => {
    AuthHelper.doAuthorize(req.headers.authorization).then(user => {
      const idArticle = Number(req.params.id),
            article = req.body.article
      db.get('SELECT * FROM Article WHERE id = ?', idArticle, (err, row) => {
        if (!row) {
          return reject('Article with this id doesn\'t exist')
        } else if (!article || !article.createdAt || !article.title || !article.description || !article.image || !article.text) {
          return reject('Missed some data!')
        } else {
          const stmt = db.prepare('UPDATE Article SET title = ?, text = ?, description = ?, createdAt = ?, image = ?, userId = ?, userName = ? WHERE id = ?')
          stmt.run(article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login, idArticle)
          stmt.finalize()
          return resolve({
            id: idArticle,
            title: article.title,
            text: article.text,
            description: article.description,
            createdAt: new Date(article.createdAt).toISOString(),
            image: article.image,
            userId: user.id,
            userName: user.login
          })
        }
      })
    },
    error => reject(error))
  }),

  deleteArticle: (req) => new Promise((resolve, reject) => {
    AuthHelper.doAuthorize(req.headers.authorization).then(user => {
      if (user.id !== 1) {
        return reject('Access error!')
      } else {
        const idArticle = req.params.id
        db.get('SELECT * FROM Article WHERE id = ?', idArticle, (err, row) => {
          if (err || !idArticle || !row) {
            return reject('Article with this id doesn\'t exist')
          }
          else {
            db.run('DELETE FROM Article WHERE id = ?', idArticle)
            setTimeout(() => {
              resolve('Article was deleted.')
            }, 1500)
          }
        })
      }
    },
    error => reject(error))
  })
}

module.exports = ArticlesController
