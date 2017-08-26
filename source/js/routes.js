import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Header from 'views/Header'
import Footer from 'views/Footer'
import Dashboard from 'views/Dashboard'
import Articles from 'views/Articles'
import Article from 'views/Article'
import About from 'views/About'
import NotFound from 'views/NotFound'

import NewArticle from 'views/_admin/Article/NewArticle'
import EditArticle from 'views/_admin/Article/EditArticle'
import Protected from 'views/_admin/wrapper-route'

const publicPath = '/'
const adminPath = '/admin/'

export const routeCodes = {
  DASHBOARD: `${ publicPath }dashboard`,
  ABOUT: `${ publicPath }about`,
  ARTICLES: `${ publicPath }articles`,
  ARTICLE: `${ publicPath }articles/:id`
}

export const routeCodesAdmin = {
  NEWARTICLE: `${ adminPath }articles/new`,
  EDITARTICLE: `${ adminPath }articles/:id`
}

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header />
          <div className='MainContent'>
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
