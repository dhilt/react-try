import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import NotFound from 'views/NotFound'
import Articles from 'views/Articles'
import Article from 'views/Article'
import Header from 'views/Header'
import Footer from 'views/Footer'
import About from 'views/About'

import EditArticle from 'views/_admin/Article/EditArticle'
import NewArticle from 'views/_admin/Article/NewArticle'
import Protected from 'views/_admin/WrapperRoute'

const adminPath = '/admin/'
const publicPath = '/'

const routeCodes = {
  ARTICLE: `${ publicPath }articles/:id`,
  DASHBOARD: `${ publicPath }dashboard`,
  ARTICLES: `${ publicPath }articles`,
  ABOUT: `${ publicPath }about`
}

const routeCodesAdmin = {
  EDITARTICLE: `${ adminPath }articles/:id`,
  NEWARTICLE: `${ adminPath }articles/new`
}

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Header />
          <div className='main-content'>
            <Switch>
              <Route exact path={ publicPath } component={ Dashboard } />
              <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
              <Route path={ routeCodes.ABOUT } component={ About } />
              <Route exact path={ routeCodes.ARTICLES } component={ Articles } />
              <Route path={ routeCodes.ARTICLE } component={ Article } />
              <Route path={ routeCodesAdmin.NEWARTICLE } component={ Protected(NewArticle, NotFound) } />
              <Route path={ routeCodesAdmin.EDITARTICLE } component={ Protected(EditArticle, NotFound) } />
              <Route component={ NotFound } />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}
