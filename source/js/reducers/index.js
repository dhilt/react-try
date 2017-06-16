import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import articles from 'reducers/articles';
import article from 'reducers/article';

import newArticle from 'reducers/_admin/newArticle';

export default combineReducers({
  dashboard,
  articles,
  article,
  auth,
  newArticle
});
