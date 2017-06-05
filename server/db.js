const fs = require('fs');
const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();
const passwordHash = require('password-hash');
const DATABASE_PATH = 'server/development.db';

const USERS_COUNT = 10;
const ARTICLES_COUNT = 20;
const ADMIN_LOGIN = 'admin';
const ADMIN_HASH = 'password34';
let logins = [];

function removeDB(cb) {
  fs.unlink(DATABASE_PATH, function() {
    console.log('Database was deleted!');
    cb();
  });
}

function setupUsers(db) {
  db.serialize(() => {
    db.run('CREATE TABLE User (id INTEGER PRIMARY KEY, login TEXT NOT NULL, hash TEXT NOT NULL)', (err) =>
      console.log(err || 'User table was created.')
    );

    const adminHash = passwordHash.generate(ADMIN_HASH);
    const stmt = db.prepare('INSERT INTO User VALUES (?, ?, ?)');
    stmt.run(1, ADMIN_LOGIN, adminHash + '');
    logins.push(ADMIN_LOGIN);
    for (let i = 2; i <= USERS_COUNT; i++) {
      let login = faker.name.firstName();
      logins.push(login);
      stmt.run(i, login, passwordHash.generate(faker.internet.password()) + '');
    }
    stmt.finalize(() => console.log('User table was populated.'));
  });
}

function setupArticles(db) {
  db.serialize(() => {
    db.run('CREATE TABLE Article (id INTEGER PRIMARY KEY, title TEXT, text TEXT, description TEXT, createdAt TEXT, image TEXT, userId INTEGER, userName TEXT)', (err) =>
      console.log(err || 'Article table was created.')
    );

    const stmt = db.prepare('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    for (let i = 1; i <= ARTICLES_COUNT; i++) {
      let userId = 1 + faker.random.number(USERS_COUNT - 1);
      stmt.run(i, faker.lorem.words(6), faker.lorem.paragraph(200), faker.lorem.paragraph(0), faker.date.past(0.5, new Date()), faker.image.abstract(), userId, logins[userId]);
    };
    stmt.finalize(() => console.log('Article table was populated.'));
  });
}

function generateDB() {
  const db = new sqlite3.Database(DATABASE_PATH);
  setupUsers(db);
  setupArticles(db);
  db.close();
}

if (fs.existsSync(DATABASE_PATH)) {
  removeDB(generateDB);
} else {
  generateDB();
}
