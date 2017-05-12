var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var passwordHash = require('password-hash');
var DATABASE_PATH = 'server/development.db';

if (fs.existsSync(DATABASE_PATH)) {
  fs.unlink(DATABASE_PATH, function () {
    console.log('Database was deleted!');
  });
}

var db = new sqlite3.Database(DATABASE_PATH);
db.serialize(function () {
  db.run('CREATE TABLE User (id INTEGER PRIMARY KEY, login TEXT NOT NULL, hash TEXT NOT NULL)');
  var adminHash = passwordHash.generate('password34');
  var stmt = db.prepare('INSERT INTO User VALUES (1, "admin", "' + adminHash + '")');
  stmt.finalize();
});
db.close();
