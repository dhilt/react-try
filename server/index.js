var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var port = 3003;

app.get('/api/test', function (req, res) {
  var users = [];
  var db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READONLY, function (Error) {
    if (Error !== null)
      throw ('No development.db found. Run "node db.js"...');
  });

  db.all('SELECT * FROM User', function (err, rows) {
    rows.forEach(function (row) {
      users.join({
        id: row.id,
        login: row.login,
        hash: row.hash
      });
    });
  });
  db.close();
  res.send(JSON.stringify(users));
});

app.listen(port, function () {
  console.log('Hello, console! Listening on port ' + port + '...');
});
