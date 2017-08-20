const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

let AuthController = {

  getUserInfo: (req) => new Promise((resolve, reject) =>
    AuthHelper.doAuthorize(req.headers.authorization).then(
      user => resolve(user),
      error => reject(error)
    )
  ),

  getAuthorization: (req) =>
    new Promise((resolve, reject) => {
      const login = req.body.login,
            password = req.body.password
      if (!login) {
        throw `Bad parameters. No login.`
      }
      if (!password) {
        throw `Bad parameters. No password.`
      }
      return resolve({ login, password })
    })
    // take user info
    .then(params =>
      db.get('SELECT * FROM User WHERE login = ?', params.login).then(
        user => {
          if (!user) {
            throw `That user doesn't exist.`
          }
          if (!AuthHelper.verifyPassword(params.password, user.hash)) {
            throw `Invalid password.`
          }
          return Promise.resolve(user)
        },
        error => { throw `Database error. Can't authorize user.` }
      )
    )
    // send result
    .then(user => {
      const userInfo = AuthHelper.getUserInfo(user)
      const token = AuthHelper.signToken(userInfo)
      return Promise.resolve({ userInfo, token })
    }),

  testUsers: (req) => new Promise((resolve, reject) =>
    db.all('SELECT * FROM User').then(
      rows => {
        let users = []
        rows.forEach(row => users.push(AuthHelper.getUserInfo(row)))
        return resolve(users)
      },
      error => reject(error)
    )
  )
}

module.exports = AuthController
