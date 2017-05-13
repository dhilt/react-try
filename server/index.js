var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var passwordHash = require('password-hash');
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

app.post('/api/login', function (req, res) {
  var login = req.query.login;
  var password = req.query.password;
  if (login === undefined || password === undefined) {
    res.send({error: 'No login or password!'});
    return;
  };

  db.all('SELECT id, login, hash FROM User', function(err, rows) {
    if (err) {
        res.send({success: false, error: err});
    } else {
      var row = rows.find(function(element) {
        return element.login = login;
      });

      var access = passwordHash.verify(password, row.hash);
      if (access)
        res.send({id: row.id, login: row.login});
      else
        res.send({success: false, error: 'Invalid password.'})
    };
  });
//  db.get('SELECT id, login = ?, hash FROM User', login, function(err, row) {
//    res.send({id: row.id, login: row.login, hash: row.hash});
//  });
});

app.listen(port, function () {
  console.log('Hello, console! Listening on port ' + port + '...');
});
