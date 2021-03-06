const db = require('../helpers/db.helper.js')
const AuthHelper = require('../helpers/auth.helper.js')

module.exports.doVote = (req, voteType) => AuthHelper.doAuthorize(req.headers.authorization)
  // params validation
  .then(user => {
    if (req.body.hasOwnProperty('vote') !== true) {
      throw `Can't vote. No vote data`
    }
    const value = Number(req.body.vote)
    const id = Number(req.params.id)
    voteType = Number(voteType)
    if (value !== -1 && value !== 1 && value !== 0) {
      throw `Can't vote. Invalid vote`
    }
    if (isNaN(id) || id <= 0) {
      throw `Can't vote. Bad entity param (id)`
    }
    if (isNaN(voteType) || voteType <= 0) {
      throw `Can't vote. Bad entity param (type)`
    }
    return Promise.resolve({ id, userId: user.id, type: voteType, value })
  })
  // search for existed vote
  .then(params =>
    db.get('SELECT * FROM Votes WHERE id = ? AND userId = ? AND type = ?', [params.id, params.userId, params.type]).then(
      result => Promise.resolve({ params, result }),
      err => { throw `Can't vote. Database error` }
    )
  )
  // process params vote
  .then(data => {
    const result = data.result
    const params = data.params
    if (!result || !result.value) {
      return db.run('INSERT INTO Votes VALUES (?, ?, ?, ?, ?)', [params.userId, params.id, params.type, params.value, new Date().toISOString()]).then(
        result => Promise.resolve(params.value),
        err => { throw `Can't vote. Database error (insert)` }
      )
    }
    else if (result.value === params.value || params.value === 0) {
      return db.run('DELETE FROM Votes WHERE id = ? AND userId = ? AND type = ?', [params.id, params.userId, params.type]).then(
        result => Promise.resolve(0),
        err => { throw `Can't vote. Database error (delete)` }
      )
    }
    else {
      return db.run('UPDATE Votes SET value = ?, date = ? WHERE userId = ? AND id = ? AND type = ?', [params.value, new Date().toISOString(), params.userId, params.id, params.type]).then(
        result => Promise.resolve(params.value),
        err => { throw `Can't vote. Database error (update)` }
      )
    }
  })
