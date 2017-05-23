const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3');
const passwordHash = require('password-hash');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');

const APP_PORT = 3003;
const AUTH_TOKEN = {
  cookieName: 'AUTH_TOKEN',
  secretKey: 'MySecretKey',
  expiresIn: 2592000
}

app.use(bodyParser.json());

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READONLY, (err) => {
  if (err)
    throw ('No development.db found. Run "node db.js"...');
});

let getUserInfo = (userObj) => {
  return {
    id: userObj.id,
    login: userObj.login
  }
};

app.get('/api/test', (req, res) => {
  db.all('SELECT * FROM User', (err, rows) => {
    if (err)
      return res.send({ status: 'error', error: err });

    let users = [];
    rows.forEach(row => users.push(getUserInfo(row)));
    res.send({ status: 'ok', result: users });
  });
});

app.get('/api/userInfo', (req, res) => {
  let token = req.headers.authorization;

  // Расшифровываем token
  jwt.verify(token, AUTH_TOKEN.secretKey, (err, decoded) => {
    if (err)
      return res.send({ status: 'error', error: 'Error with token.' });

    res.send({ status: 'ok', result: getUserInfo(decoded) });
  });
});

app.post('/api/login', (req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  if (!login || !password)
    return res.send({ status: 'error', error: 'No login or password!' });

  db.get('SELECT * FROM User WHERE login = ?', login, (err, row) => {
    if (err)
      return res.send({ status: 'error', error: err });

    if (!row)
      return res.send({status: 'error', error: 'Invalid login'})

    if (!passwordHash.verify(password, row.hash))
      return res.send({ status: 'error', error: 'Invalid password.' });

    let token = jwt.sign({
        id: row.id,
        login: row.login
      },
      AUTH_TOKEN.secretKey, { expiresIn: AUTH_TOKEN.expiresIn }
    );

    res.send({ status: 'ok', userInfo: getUserInfo(row), token: token });
  });
});

app.listen(APP_PORT, () => {
  console.log('Hello, console! Listening on port ' + APP_PORT + '...');
});
