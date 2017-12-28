import { combineReducers, reduceReducers } from 'redux'

import { adminReducers } from './_admin'
import dashboard from 'reducers/dashboard'
import articles from 'reducers/articles'
import article from 'reducers/article'
import auth from 'reducers/auth'

export default setRootReducer =>
  combineReducers({...adminReducers,
    dashboard,
    articles,
    article,
    auth
  })
