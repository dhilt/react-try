const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const APP_PORT = 3003;
const AUTH_TOKEN = {
  secretKey: 'MySecretKey',
  expiresIn: 2592000
};
const DEV_DELAY = 500;

const ARTICLES = {
  defaultCount: 10,
  dashboardCount: 6,
  dashboardTextCut: 150
};

app.use(bodyParser.json());

let db = new sqlite3.Database('server/development.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err)
    throw ('No development.db found. Run "node db.js"...');
});

let getUserInfo = (userObj) => {
  return {
    id: userObj.id,
    login: userObj.login,
    role: userObj.role
  }
};

let doAuthorize = (req, res) => {
  return new Promise((resolve, reject) => {
    let token = req.headers.authorization;
    jwt.verify(token, AUTH_TOKEN.secretKey, (err, decoded) => {
      if (!err) { // resolve userInfo
        return resolve(getUserInfo(decoded));
      }
      if (!res) { // reject the error by default
        reject(err);
      } else { // send error response if possible
        res.send({ status: 'error', error: err });
      }
    });
  })
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
  doAuthorize(req, res).then(userInfo =>
    res.send({ status: 'ok', userInfo })
  );
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
      return res.send({ status: 'error', error: 'Invalid login' });

    if (!passwordHash.verify(password, row.hash))
      return res.send({ status: 'error', error: 'Invalid password.' });

    let token = jwt.sign({
        id: row.id,
        login: row.login,
        role: row.role
      },
      AUTH_TOKEN.secretKey, { expiresIn: AUTH_TOKEN.expiresIn }
    );

    res.send({ status: 'ok', userInfo: getUserInfo(row), token: token });
  });
});

app.get('/api/articles', (req, res) => {
  const dashboard = req.query.hasOwnProperty('dashboard');
  let count = Number(req.query.count) || ARTICLES.defaultCount;
  let offset = Number(req.query.offset) || 0;
  let orderBy = 'createdAt';
  let orderDir = 'DESC';

  if (dashboard) {
    count = ARTICLES.dashboardCount;
  }

  const ordering = (orderBy ? ' ORDER BY ' + orderBy + ' ' : '') + (orderBy && orderDir ? orderDir : '');

  db.all('SELECT * FROM Article ' + ordering + ' LIMIT ? OFFSET ?', [count, offset], (err, row) => {
    if (err)
      return res.send({ status: 'error', error: err });

    if (dashboard) {
      // режем текст на 150 символов
      row.forEach(item =>
        item.text = item.text.slice(0, ARTICLES.dashboardTextCut)
      );
    }

    db.get('SELECT COUNT(id) FROM Article', (err, total) => {
      setTimeout(() => res.send({ articles: row, total: total['COUNT(id)'] }), DEV_DELAY);
    })
  });
});

app.get('/api/articles/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM Article WHERE id = ?', id, (err, row) => {
    if (err)
      return res.send({ status: 'error', error: err });
    if (!row.length)
      return res.send({ status: 'error', error: 'Article with this id doesn\'t exist' });

    res.send({ status: 'ok', article: row[0] });
  });
});

app.post('/api/articles/create', (req, res) => {
  doAuthorize(req, res)
    .then(user => {
      let article = req.body.article;
      if (!article || !article.date || !article.title || !article.description || !article.image || !article.text) {
        return res.send({ status: 'error', error: 'Missed some data!' });
      }
      db.get('SELECT COUNT(id) FROM Article', (err, total) => {
        if (err) {
          return res.send({ status: 'error', error: err });
        }
        const stmt = db.prepare('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(total['COUNT(id)'] + 1, article.title, article.text, article.description, new Date(article.date).toISOString(), article.image, user.id, user.login);
        stmt.finalize();
        res.send({ id: total['COUNT(id)'] + 1, title: article.title, text: article.text, description: article.description, createdAt: new Date(article.date).toISOString(), image: article.image, userId: user.id, userName: user.login });
      })
    });
});

app.listen(APP_PORT, () => {
  console.log('Hello, console! Listening on port ' + APP_PORT + '...');
});
