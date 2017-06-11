import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import articles from 'reducers/articles';
import article from 'reducers/article';

export default combineReducers({
  dashboard,
  articles,
  article,
  auth
});
