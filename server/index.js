const express = require('express');
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

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    throw ('No development.db found. Run "node db.js"...');
  }
});

let getUserInfo = (userObj) => {
  return {
    id: userObj.id,
    login: userObj.login
  }
};

app.get('/api/test', (req, res) => {
  db.all('SELECT * FROM User', (err, rows) => {
    if (err) {
      return res.send({ status: 'error', error: err });
    }
    let users = [];
    rows.forEach(row => users.push(getUserInfo(row)));
    res.send({ status: 'ok', result: users });
  });
});

app.get('/api/userInfo', (req, res) => {
  // Берем cookies
  let cookies = new Cookies(req, res);
  let cookie = cookies.get(AUTH_TOKEN.cookieName);
  if (!cookie) {
    return res.send({ status: 'error', error: 'Have no cookies.' });
  }

  // Расшифровываем token
  jwt.verify(cookie, AUTH_TOKEN.secretKey, (err, decoded) => {
    if (err) {
      return res.send({ status: 'error', error: 'Error with cookies.' });
    }
    res.send({ status: 'ok', result: getUserInfo(decoded) });
  });
});

app.post('/api/login', (req, res) => {
  let login = req.query.login;
  let password = req.query.password;
  if (!login || !password) {
    return res.send({ error: 'No login or password!' });
  }

  db.get('SELECT * FROM User WHERE login = ?', login, (err, row) => {
    if (err) {
      return res.send({ status: 'error', error: err });
    }
    if (!passwordHash.verify(password, row.hash)) {
      return res.send({ status: 'error', error: 'Invalid password.' });
    }

    let token = jwt.sign({
        id: row.id,
        login: row.login
      },
      AUTH_TOKEN.secretKey, { expiresIn: AUTH_TOKEN.expiresIn }
    );

    let cookies = new Cookies(req, res);
    cookies.set(AUTH_TOKEN.cookieName, token);

    res.send({ status: 'ok', result: getUserInfo(row) });
  });
});

app.listen(APP_PORT, () => {
  console.log('Hello, console! Listening on port ' + APP_PORT + '...');
});
