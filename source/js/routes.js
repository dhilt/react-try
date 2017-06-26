import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Header from 'views/Header/index'

import Dashboard from 'views/Dashboard';
import Articles from 'views/Articles';
import Article from 'views/Article';
import About from 'views/About';
import NotFound from 'views/NotFound';

import NewArticle from 'views/_admin/NewArticle';
import EditArticle from 'views/_admin/EditArticle';

const publicPath = '/';
const adminPath = '/admin/';

export const routeCodes = {
  DASHBOARD: `${ publicPath }dashboard`,
  ABOUT: `${ publicPath }about`,
  ARTICLES: `${ publicPath }articles`,
  ARTICLE: `${ publicPath }articles/:id`
};

export const routeCodesAdmin = {
  NEWARTICLE: `${ adminPath }articles/new`,
  EDITARTICLE: `${ adminPath }articles/edit`
};

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
              <Route path={ routeCodesAdmin.NEWARTICLE } component={ NewArticle } />
              <Route path={ routeCodesAdmin.EDITARTICLE } component={ EditArticle } />
              <Route component={ NotFound } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
