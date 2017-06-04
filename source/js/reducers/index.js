import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';

export default combineReducers({
  dashboard,
  auth
});
