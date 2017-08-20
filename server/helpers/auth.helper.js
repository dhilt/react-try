const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')

const AUTH_TOKEN = {
  secretKey: 'MySecretKey',
  expiresIn: 2592000
}

let AuthHelper = {

  doAuthorize: (token) => new Promise((resolve, reject) =>
    jwt.verify(token, AUTH_TOKEN.secretKey, (err, decoded) => {
      if (!err) { // resolve userInfo
        return resolve({ id: decoded.id, login: decoded.login, role: decoded.role })
      } else  {
        return reject(err)
      }
    })
  ),

  getUserInfo: (userObj) => {
    return {
      id: userObj.id,
      login: userObj.login,
      role: userObj.role
    }
  },

  signToken: (userObj) => {
    return jwt.sign(userObj, AUTH_TOKEN.secretKey, { expiresIn: AUTH_TOKEN.expiresIn })
  },

  verifyPassword: (password, hash) => {
    return passwordHash.verify(password, hash)
  }
}

module.exports = AuthHelper
