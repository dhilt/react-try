import { combineReducers, reduceReducers } from 'redux';
import auth from 'reducers/auth';
import dashboard from 'reducers/dashboard';
import articles from 'reducers/articles';
import article from 'reducers/article';

import { adminReducers } from './_admin';

let setRootReducer = () =>
  combineReducers({
    dashboard,
    articles,
    article,
    auth,
    ...adminReducers
  })

export default setRootReducer