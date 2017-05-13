var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var port = 3003;

var db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READONLY, function (Error) {
  if (Error !== null)
    throw ('No development.db found. Run "node db.js"...');
});

app.get('/api/test', function (req, res) {
  var users = [];
  var user = {};

  db.all('SELECT * FROM User', function (err, rows) {
    if (!err) {
      rows.forEach(function (row) {
        user = {id: row.id, login: row.login, hash: row.hash};
        users.push(user);
      });
      res.send({success: true, result: users});
    } else {
      res.send({success: false, error: err});
    };
  });
});

app.listen(port, function () {
  console.log('Hello, console! Listening on port ' + port + '...');
});
