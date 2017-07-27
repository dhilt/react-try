const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err)
    throw ('No development.db found. Run "node db.js"...')
})

let patchMethod = (func) => {
  const dbFunc = func
  return function () {
    // old syntax (callback last argument)
    if(typeof arguments[arguments.length - 1] === 'function') {
      dbFunc.apply(this, arguments)
      return
    }
    // new promise syntax
    return new Promise((resolve, reject) => {
      const cb = (error, result) => {
        if(error) {
          reject(error)
        }
        else {
          resolve(result)
        }
      }
      const newArgs = [...arguments, cb]
      dbFunc.apply(this, newArgs)
    })
  }
}

// patch db.get, db.run, db.all to make it promise-based if no callback passed
db.get = patchMethod(db.get)
db.run = patchMethod(db.run)
db.all = patchMethod(db.all)

module.exports = db
