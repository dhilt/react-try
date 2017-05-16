import { combineReducers } from 'redux';
import app from 'reducers/app';
import auth from 'reducers/auth';

export default combineReducers({
  app,
  auth
});
