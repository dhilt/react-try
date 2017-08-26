const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ArticlesController = require('./controllers/articles.controller')
const VotesController = require('./controllers/votes.controller')
const GamesController = require('./controllers/games.controller')
const AuthController = require('./controllers/auth.controller')

const APP_PORT = 3003

app.use(bodyParser.json())

app.get('/api/test', (req, res) => AuthController.testUsers(req)
  .then(result => res.send({ status: 'ok', result }))
  .catch(error => res.send({ status: 'error', error }))
)

app.get('/api/userInfo', (req, res) => AuthController.getUserInfo(req)
  .then(userInfo => res.send({ status: 'ok', userInfo }))
  .catch(error => res.send({ status: 'error', error }))
)

app.post('/api/login', (req, res) => AuthController.getAuthorization(req)
  .then(result => res.send({ status: 'ok', userInfo: result.userInfo, token: result.token }))
  .catch(error => res.send({ status: 'error', error }))
)

app.get('/api/articles', (req, res) => ArticlesController.getArticles(req)
  .then(result => res.send({ status: 'ok', articles: result.articles, total: result.total }))
  .catch(error => res.send({ status: 'error', error }))
)

app.get('/api/articles/:id', (req, res) => ArticlesController.getArticleById(req)
  .then(result => res.send({ status: 'ok', article: result.article, rateUser: result.rateUser }))
  .catch(error => res.send({ status: 'error', error }))
)

app.post('/api/articles', (req, res) => ArticlesController.createArticle(req)
  .then(result => res.send({ status: 'ok', result }))
  .catch(error => res.send({ status: 'error', error }))
)

app.put('/api/articles/:id', (req, res) => ArticlesController.updateArticle(req)
  .then(result => res.send({ status: 'ok', result }))
  .catch(error => res.send({ status: 'error', error }))
)

app.delete('/api/articles/:id', (req, res) => ArticlesController.deleteArticle(req)
  .then(result => res.send({ status: 'ok', msg: result }))
  .catch(error => res.send({ status: 'error', error }))
)

app.put('/api/articles/:id/rate', (req, res) => VotesController.doVote(req, 1)  // 1 - article type in database Votes
  .then(result => res.send({ status: 'ok', value: result }))
  .catch(error => res.send({ status: 'error', error }))
)

app.get('/api/games', (req, res) => GamesController.getGames(req)
  .then(result => res.send({ status: 'ok', games: result}))
  .catch(error => res.send({ status: 'error', error }))
)

app.listen(APP_PORT, () =>
  console.log('Hello, console! Listening on port ' + APP_PORT + '...')
)
