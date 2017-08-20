const db = require('../helpers/db.helper.js')

const GAMES = {
  defaultCount: 4,
  dashboardCount: 5
}

let GamesController = {

  getGames: (req) =>
    new Promise((resolve, reject) => {
      const dashboard = req.query.hasOwnProperty('dashboard')
      let count = Number(req.query.count) || GAMES.defaultCount
      if (isNaN(count) || count <= 0) {
        throw `Can't get games. Bad entity param (count)`
      }
      let orderBy = 'createdAt'
      let orderDir = 'DESC'
      if (dashboard) {
        count = GAMES.dashboardCount
      }
      const ordering = (orderBy ? ' ORDER BY ' + orderBy + ' ' : '') + (orderBy && orderDir ? orderDir : '')
      return resolve({ count, ordering })
    })
    // get games
    .then(params =>
      db.all('SELECT * FROM Game' + params.ordering + ' LIMIT ?', params.count).then(
        games => Promise.resolve(games),
        error => { throw `Can't get games. Database error (select)`}
      )
    )
}

module.exports = GamesController
