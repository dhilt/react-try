var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var port = 3003;

app.get('/api/test', function (req, res) {
  var users = [];
  var user = {};
  var db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READONLY, function (Error) {
    if (Error !== null)
      throw ('No development.db found. Run "node db.js"...');
  });

  db.all('SELECT * FROM User', function (err, rows) {
    rows.forEach(function (row) {
      user = {id: row.id, login: row.login, hash: row.hash};
      users.push(user);
    });
    res.send(users);
  });
  db.close();
});

app.listen(port, function () {
  console.log('Hello, console! Listening on port ' + port + '...');
});
