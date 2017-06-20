import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from 'views/Header/index'

import Dashboard from 'views/Dashboard';
import Articles from 'views/Articles';
import Article from 'views/Article';
import About from 'views/About';
import NotFound from 'views/NotFound';

import NewArticle from 'views/_admin/NewArticle';

const publicPath = '/';
const adminPath = '/admin/';

export const routeCodes = {
  DASHBOARD: `${ publicPath }dashboard`,
  ABOUT: `${ publicPath }about`,
  ARTICLES: `${ publicPath }articles`,
  ARTICLE: `${ publicPath }articles/:id`
};

export const routeCodesAdmin = {
  NEWARTICLE: `${ adminPath }articles/new`
};

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className='App'>
          <Header />

          <Route exact path={ publicPath } component={ Dashboard } />
          <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
          <Route path={ routeCodes.ABOUT } component={ About } />
          <Route path={ routeCodes.ARTICLES } component={ Articles } />
          <Route path={ routeCodes.ARTICLE } component={ Article } />
          <Route path={ routeCodesAdmin.NEWARTICLE } component={ NewArticle } />
          <Route path='*' component={ NotFound } />          
        </div>      

      </BrowserRouter>
    );
  }
}
