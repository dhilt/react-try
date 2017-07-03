import fetch from 'isomorphic-fetch'

let getConfig = (payload, methodQuery) => {
  let config = {
    headers: {}
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['authorization'] = token
  }
  config.method = methodQuery || 'get'
  if (payload) {
    config.body = JSON.stringify(payload)
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
  }
  return config
}

export function asyncRequest(path, methodQuery, payload) {
  return fetch(location.origin + '/api/' + path, getConfig(payload, methodQuery))
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
