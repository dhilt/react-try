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
  const offset = Number(req.query.offset) || 0;
  const title = req.query.title ? '%' + req.query.title + '%' : '%%';
  const author = req.query.author ? '%' + req.query.author + '%' : '%%';
  const dateFrom = req.query.dateFrom ? req.query.dateFrom + 'T00:00:00' : '1970-01-01';
  const dateTo = req.query.dateTo ? req.query.dateTo + 'T23:59:59' : 'date("now")';
  const orderBy = 'createdAt';
  const orderDir = 'DESC';

  if (dashboard) {
    count = ARTICLES.dashboardCount;
  }

  const ordering = (orderBy ? ' ORDER BY ' + orderBy + ' ' : '') + (orderBy && orderDir ? orderDir : '');

  db.all('SELECT * FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ' + ordering + ' LIMIT ? OFFSET ?', [author, title, dateFrom, dateTo, count, offset], (err, rows) => {
    if (err)
      return res.send({ status: 'error', error: err });

    if (dashboard) {
      // режем текст на 150 символов
      rows.forEach(item =>
        item.text = item.text.slice(0, ARTICLES.dashboardTextCut)
      );
    }

    db.get('SELECT COUNT(id) FROM Article WHERE userName LIKE ? AND title LIKE ? AND createdAt BETWEEN ? AND ? ', [author, title, dateFrom, dateTo], (err, total) => {
      setTimeout(() => res.send({ articles: rows, total: total['COUNT(id)'] }), DEV_DELAY);
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

app.post('/api/articles', (req, res) => {
  doAuthorize(req, res)
    .then(user => {
      const article = req.body.article;
      if (!article || !article.createdAt || !article.title || !article.description || !article.image || !article.text) {
        return res.send({ status: 'error', error: 'Missed some data!' });
      }
      db.get('SELECT max(id) FROM Article', (err, newId) => {
        if (err) {
          return res.send({ status: 'error', error: err });
        }
        const stmt = db.prepare('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(newId['max(id)'] + 1, article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login);
        stmt.finalize();
        res.send({ id: newId['max(id)'] + 1, title: article.title, text: article.text, description: article.description, createdAt: new Date(article.createdAt).toISOString(), image: article.image, userId: user.id, userName: user.login });
      })
    });
});

app.put('/api/articles/:id', (req, res) => {
  doAuthorize(req, res).then(user => {
    const idArticle = req.params.id;
    const article = req.body.article;
    db.get('SELECT * FROM Article WHERE id = ?', idArticle, (err, row) => {
      if (!row) {
        return res.send({ status: 'error', error: 'Article with this id doesn\'t exist' });
      } else if (!article || !article.createdAt || !article.title || !article.description || !article.image || !article.text) {
        return res.send({ status: 'error', error: 'Missed some data!' });
      } else {
        const stmt = db.prepare('UPDATE Article SET title = ?, text = ?, description = ?, createdAt = ?, image = ?, userId = ?, userName = ? WHERE id = ?');
        stmt.run(article.title, article.text, article.description, new Date(article.createdAt).toISOString(), article.image, user.id, user.login, idArticle);
        stmt.finalize();
        res.send({
          id: idArticle,
          title: article.title,
          text: article.text,
          description: article.description,
          createdAt: new Date(article.createdAt).toISOString(),
          image: article.image,
          userId: user.id,
          userName: user.login
        });
      }
    });
  });
});

app.put('/api/articles/:id/rate', (req, res) => {
  doAuthorize(req, res).then(user => {
    const isVoted = req.body.isVoted,
          vote = req.body.vote,
          idArticle = req.params.id;
    db.get('SELECT rateUp, rateDown FROM Article WHERE id = ?', idArticle, (err, row) => {
      if (vote == 1) {
        const stmt = db.prepare('UPDATE Article SET rateUp = ? WHERE id = ?');
        if (isVoted) {
          stmt.run(row.rateUp - 1, idArticle)
        } else {
          stmt.run(row.rateUp + 1, idArticle)
        }
      } else if (vote == -1) {
        const stmt = db.prepare('UPDATE Article SET rateDown = ? WHERE id = ?');
        if (isVoted) {
          stmt.run(row.rateDown - 1, idArticle)
        } else {
          stmt.run(row.rateDown + 1, idArticle)
        }
      }
    });
    res.send({ success: 'ok' })
  });
});

app.delete('/api/articles/:id', (req, res) => {
  doAuthorize(req, res).then(user => {
    if (user.id !== 1) {
      return res.send({ status: 'error', error: 'Access error!' });
    } else {
      const idArticle = Number(req.params.id);
      db.get('SELECT * FROM Article WHERE id = ?', idArticle, (err, row) => {
        if (err || !idArticle || !row) {
          return res.send({ status: 'error', error: 'Article with this id doesn\'t exist' });
        }
        else {
          db.run('DELETE FROM Article WHERE id = ?', idArticle);
          setTimeout(() => {
            return res.send({ status: 'ok', msg: 'Article was deleted.' });
          }, 1500)
        }
      });
    }
  });
});

app.listen(APP_PORT, () => {
  console.log('Hello, console! Listening on port ' + APP_PORT + '...');
});
