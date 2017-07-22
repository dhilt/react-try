const sqlite3 = require('sqlite3')
const jwt = require('jsonwebtoken')

const AUTH_TOKEN = {
  secretKey: 'MySecretKey',
  expiresIn: 2592000
}

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err)
    throw ('No development.db found. Run "node db.js"...')
})

let doAuthorize = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, AUTH_TOKEN.secretKey, (err, decoded) => {
      if (!err) { // resolve userInfo
        return resolve(getUserInfo(decoded))
      } else {
        reject('Token no correct.')
      }
    })
  })
}

let getUserInfo = (userObj) => {
  return {
    id: userObj.id,
    login: userObj.login,
    role: userObj.role
  }
}

let ArticlesController = {

  getArticleById: (id, token) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject('Bad parameters.')
      }
      id = Number(id)
      if (isNaN(id) || id <= 0) {
        reject('Bad parameters. (2)')
      }

      db.get('SELECT * FROM Article WHERE Article.id = ?', id, (err, article) => {
        if (err) {
          console.log(err)
          reject('Database error.')
        }
        if (!article) {
          reject('Article doesn\'t exist')
        }

        db.all('SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = -1 UNION ALL SELECT COUNT(userId) FROM Votes WHERE type = 1 AND id = $id AND value = 1', { $id: id }, (err, rate) => {
          article.rateDown = 0 || rate[0]['COUNT(userId)']
          article.rateUp = 0 || rate[1]['COUNT(userId)']
          if (!token) {
            resolve({ article: article })
          } else {
            doAuthorize(token).then(user => {
              db.get('SELECT value FROM Votes WHERE id = ? AND userId = ? AND type = 1', [id, user.id], (err, voteValue) => {
                if (err) {
                  reject('Database error.')
                }
                resolve({ article: article, rateUser: voteValue ? voteValue.value : null })
              })
            })
          }
        })
      })
    })
  }
}

module.exports = ArticlesController
