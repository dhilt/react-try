import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import articles from 'reducers/articles';

export default combineReducers({
  dashboard,
  articles,
  auth
});
