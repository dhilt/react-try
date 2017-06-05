const fs = require('fs');
const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();
const passwordHash = require('password-hash');
const DATABASE_PATH = 'server/development.db';

if (fs.existsSync(DATABASE_PATH)) {
  fs.unlink(DATABASE_PATH, function () {
    console.log('Database was deleted!');
  });
}

const db = new sqlite3.Database(DATABASE_PATH);
db.serialize(() => {
  db.run('CREATE TABLE User (id INTEGER PRIMARY KEY, login TEXT NOT NULL, hash TEXT NOT NULL)');
  const adminHash = passwordHash.generate('password34');
  const stmt = db.prepare('INSERT INTO User VALUES (?, ?, ?)');
  stmt.run(1, 'admin', adminHash + '');
  for (let i = 2; i <= 10; i++) {
    stmt.run(i, faker.name.firstName(), passwordHash.generate(faker.internet.password()) + '');
  }
  stmt.finalize();
});

db.serialize(() => {
  db.run('CREATE TABLE Article (id INTEGER PRIMARY KEY, title TEXT, text TEXT, description TEXT, createdAt TEXT, image TEXT, userId INTEGER, userName TEXT)');
  const stmt = db.prepare('INSERT INTO Article VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  for (let i = 1; i <= 200; i++) {
    let userId = 1 + faker.random.number(9);
    let userName = '';
    db.get('SELECT login FROM User WHERE id = ?', userId, (err, row) => {
      userName = row.login;
    });
    stmt.run(i, faker.lorem.words(6), faker.lorem.paragraph(200), faker.lorem.paragraph(0), faker.date.past(0.5, new Date()), faker.image.abstract(), userId, userName);
  };
  stmt.finalize();
});

db.close();
