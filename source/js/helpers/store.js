import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'dev/logger'

import setRootReducer from '../reducers'
import { setAdminReducer } from '../reducers/_admin';

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
  }

}
