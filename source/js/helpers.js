import fetch from 'isomorphic-fetch'

let getConfig = (payload) => {
  let config = {
    headers: {}
  };
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

let asyncRequest = (path, payload) =>
  fetch('api/' + path, getConfig(payload))
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
