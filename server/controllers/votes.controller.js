const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

let VotesController = {

  doVote: (req, voteType) => new Promise((resolve, reject) =>
    AuthHelper.doAuthorize(req.headers.authorization).then(user => {
      if (req.body.hasOwnProperty('vote') !== true) {
        return reject('No vote....')
      }
      voteType = Number(voteType)
      const id = Number(req.params.id), vote = Number(req.body.vote)
      if (vote !== -1 && vote !== 1 && vote !== 0) {
        return reject('Vote is undefined.')
      }

      db.get('SELECT * FROM Votes WHERE id = ? AND userId = ? AND type = ?', [id, user.id, voteType], (err, voteRow) => {
        if (err) {
          return reject('Database error.')
        }
        if (!voteRow || !voteRow.value) {
          db.run('INSERT INTO Votes VALUES (?, ?, ?, ?, ?)', [user.id, id, voteType, vote, new Date().toISOString()])
          return resolve({ value: vote })
        }
        else {
          if (voteRow.value === vote || vote === 0) {
            db.run('DELETE FROM Votes WHERE id = ? AND userId = ? AND type = ?', [id, user.id, voteType])
            return resolve({ value: 0 })
          }
          else if (voteRow.value !== vote) {
            db.run('UPDATE Votes SET value = ?, date = ? WHERE userId = ? AND id = ? AND type = ?', [vote, new Date().toISOString(), user.id, id, voteType]);
            return resolve({ value: vote })
          }
        }
      })
    },
    error => reject(error))
  )
}

module.exports = VotesController
