import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

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

export function asyncRequest (path, payload) {
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
  if(!location.query.page) {
    location.query.page = page + 1
    browserHistory.replace(location)
  }
  else if (Number(location.query.page) !== page + 1) {
    location.query.page = page + 1
    browserHistory.push(location)
  }
  localStorage.setItem('pageArticles', page)
}
