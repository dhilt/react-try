const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

let AuthController = {

  getUserInfo: (req) => new Promise((resolve, reject) =>
    AuthHelper.doAuthorize(req.headers.authorization).then(
      user => resolve(user),
      error => reject(error)
    )
  ),

  getAuthorization: (req) => new Promise((resolve, reject) => {
    const login = req.body.login,
          password = req.body.password
    if (!login || !password) {
      return reject('No login or password!')
    }
    db.get('SELECT * FROM User WHERE login = ?', login, (err, row) => {
      if (err) {
        return reject(err)
      }
      if (!row) {
        return reject('Invalid login')
      }
      if (!AuthHelper.verifyPassword(password, row.hash)) {
        return reject('Invalid password.')
      }
      const token = AuthHelper.signToken(AuthHelper.getUserInfo(row))
      resolve({ userInfo: AuthHelper.getUserInfo(row), token: token })
    })
  }),

  testUsers: (req) => new Promise((resolve, reject) =>
    db.all('SELECT * FROM User', (err, rows) => {
      if (err) {
        return reject(err)
      }
      let users = []
      rows.forEach(row => users.push(AuthHelper.getUserInfo(row)))
      resolve(users)
    })
  )
}

module.exports = AuthController
