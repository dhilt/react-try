var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var passwordHash = require('password-hash');

if (fs.existsSync('server/development.db')) {
  fs.unlink('server/development.db', function () {
    console.log('Database was deleted!');
  });
}

var db = new sqlite3.Database('server/development.db');
db.serialize(function () {
  db.run('CREATE TABLE User (id INTEGER PRIMARY KEY, login TEXT NOT NULL, hash TEXT NOT NULL)');
  var adminHash = passwordHash.generate('password34');
  var stmt = db.prepare('INSERT INTO User VALUES (1, "admin", "' + adminHash + '")');
  stmt.finalize();
});
db.close();
