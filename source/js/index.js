import 'babel-polyfill'
import '../scss/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { storeHelper } from './helpers/store'
import initializeMethods from './helpers/initNewMethods'
import { authorizeByTokenAsync } from './actions/auth'
import Routes from 'routes'

const isProduction = process.env.NODE_ENV === 'production'

const store = storeHelper.generateStore(isProduction)

localStorage.removeItem('pageArticles')
if (localStorage.getItem('token')) {
  store.dispatch(authorizeByTokenAsync())
}

// Added to js-Date new method: getMonthName...
initializeMethods()

// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
