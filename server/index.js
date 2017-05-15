var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var passwordHash = require('password-hash');
var Cookies = require('cookies');
var jwt = require('jsonwebtoken');
var REGISTRATION_KEY = 'REGISTRATION_KEY';
var SECRET_KEY = 'SecretKey';
var TOKEN_EXPIRATION_TIME = 2592000;
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

  db.get('SELECT * FROM User WHERE login = ?', login, function(err, row) {
    if (err)
      res.send({success: false, error: err});
    else
      if (passwordHash.verify(password, row.hash)) {
        // Хеш пароля с логином шифруем и сохраняем в json
        var token = jwt.sign({id: row.id, login: row.login}, SECRET_KEY, {expiresIn: TOKEN_EXPIRATION_TIME});

        // Сохраняем в cookies
        var cookies = new Cookies(req, res);
        cookies.set(REGISTRATION_KEY, token);

        res.send({id: row.id, login: row.login});
      }
      else
        res.send({success: false, error: 'Invalid password.'});
  });
  
});

app.listen(port, function () {
  console.log('Hello, console! Listening on port ' + port + '...');
});
