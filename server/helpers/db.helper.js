const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err)
    throw ('No development.db found. Run "node db.js"...')
})

// patch db.get to make it promise-based if no callback passed
const dbGet = db.get;
db.get = function () {
  // old syntax (callback last argument)
  if(typeof arguments[arguments.length - 1] === 'function') {
    dbGet.apply(this, arguments)
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
    dbGet.apply(this, newArgs)
  })
}

// patch db.run to make it promise-based if no callback passed
const dbRun = db.run;
db.run = function () {
  // old syntax (callback last argument)
  if(typeof arguments[arguments.length - 1] === 'function') {
    dbRun.apply(this, arguments)
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
    dbRun.apply(this, newArgs)
  })
}

// patch db.all to make it promise-based if no callback passed
const dbAll = db.all;
db.all = function () {
  // old syntax (callback last argument)
  if(typeof arguments[arguments.length - 1] === 'function') {
    dbAll.apply(this, arguments)
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
    dbAll.apply(this, newArgs)
  })
}

module.exports = db
