import fetch from 'isomorphic-fetch'

let getConfig = (queryType, payload) => {
  let config = {
    headers: {}
  }
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['authorization'] = token
  }
  if (queryType == 'post') {
    config.method = 'post'
    config.body = JSON.stringify(payload)
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
  } else if (queryType == 'get') {
    config.method = 'get'
  }
  return config
}

let asyncRequest = (path, queryType, payload) =>
  fetch('api/' + path, getConfig(queryType, payload))
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

export default asyncRequest
