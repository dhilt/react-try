import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
import Dashboard from 'views/Dashboard';
import Articles from 'views/Articles';
import Article from 'views/Article';
import About from 'views/About';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: `${ publicPath }dashboard`,
  ABOUT: `${ publicPath }about`,
  ARTICLES: `${ publicPath }articles`,
  ARTICLE: `${ publicPath }articles/:id`
};

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ Dashboard } />
          <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
          <Route path={ routeCodes.ABOUT } component={ About } />
          <Route path={ routeCodes.ARTICLES } component={ Articles } />
          <Route path={ routeCodes.ARTICLE } component={ Article } />
          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}
