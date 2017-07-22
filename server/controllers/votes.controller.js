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

let VotesController = {

  doVote: (token, id, vote, voteType) => {
    return new Promise((resolve, reject) => {
      doAuthorize(token).then(
        user => {
          if (vote === undefined) {
            reject('Have no vote.')
          }
          vote = Number(vote)
          id = Number(id)
          if (vote !== -1 && vote !== 1 && vote !== 0) {
            reject('Vote is undefined.')
          }

          db.get('SELECT * FROM Votes WHERE id = ? AND userId = ? AND type = ?', [id, user.id, voteType], (err, voteRow) => {
            if (err) {
              reject('Database error.')
            }
            if (!voteRow || !voteRow.value) {
              db.run('INSERT INTO Votes VALUES (?, ?, ?, ?, ?)', [user.id, id, voteType, vote, new Date().toISOString()])
              resolve({ value: vote })
            }
            else {
              if (voteRow.value === vote || vote === 0) {
                db.run('DELETE FROM Votes WHERE id = ? AND userId = ? AND type = ?', [id, user.id, voteType])
                resolve({ value: 0 })
              }
              else if (voteRow.value !== vote) {
                db.run('UPDATE Votes SET value = ?, date = ? WHERE userId = ? AND id = ? AND type = ?', [vote, new Date().toISOString(), user.id, id, voteValue]);
                resolve({ value: vote })
              }
            }
          })
        },
        errorTokenMessage => reject(errorTokenMessage)
      )
    })
  }
}

module.exports = VotesController
