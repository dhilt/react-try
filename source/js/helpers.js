import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'dev/logger'

import setRootReducer from 'reducers'
import { setAdminReducerAction } from 'actions/_admin/common'
import { setAdminReducer } from 'reducers/_admin';

let getConfig = (payload) => {
  let config = {
    headers: {}
  }
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['authorization'] = token
  }
  if (payload) {
    config.method = 'post'
    config.body = JSON.stringify(payload)
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
  } else {
    config.method = 'get'
  }
  return config
}

export function asyncRequest(path, payload) {
  return fetch(location.origin + '/api/' + path, getConfig(payload))
    .then(response => {
      // http response processing
      if (!response.ok) {
        throw (response.statusText + ' (' + response.status + ')')
      }
      return response.json()
    })
    .then(json => {
      // api server response processing
      if (json.status === 'error') {
        throw (json.error)
      }
      return json
    })
}

export function persistPage(page) {
  const location = browserHistory.getCurrentLocation()
  if (!location.query.page) {
    location.query.page = page + 1
    browserHistory.replace(location)
  } else if (Number(location.query.page) !== page + 1) {
    location.query.page = page + 1
    browserHistory.push(location)
  }
  localStorage.setItem('pageArticles', page)
}

//--------Store helper----------//

export let storeHelper = {

  store: null,

  generateStore: function(isProduction) {
    let store = null
    let rootReducer = setRootReducer();

    if (isProduction) {
      // In production adding only thunk middleware
      const middleware = applyMiddleware(thunk)

      store = createStore(
        rootReducer,
        middleware
      )
    } else {
      // In development mode beside thunk
      // logger and DevTools are added
      const middleware = applyMiddleware(thunk, logger)
      let enhancer

      // Enable DevTools if browser extension is installed
      if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
        enhancer = compose(
          middleware,
          window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
        )
      } else {
        enhancer = compose(middleware)
      }

      store = createStore(
        rootReducer,
        enhancer
      )
    }

    this.store = store
    return store
  },

  setAdminReducer: function() {
    setAdminReducer();
    this.store.replaceReducer(setRootReducer())
  },

  dispatchSetAdminReducerAction: function() {
    this.store.dispatch(setAdminReducerAction());
  }

}
