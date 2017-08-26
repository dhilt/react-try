function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

function setParameterByName(param, newval, location) {
    var search = location.search
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?")
    var query = search.replace(regex, "$1").replace(/&$/, '')
    location.search = (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '')
    return location
}

export function getLocationPage(location) {
  return Number(getParameterByName('page', location.search))
}

export function persistPage(page, hystory) {
  let locationPage = Number(getLocationPage(hystory.location))
  if (!locationPage) {
    setParameterByName('page', page + 1, hystory.location)
    hystory.replace(hystory.location)
  } else if (locationPage !== page + 1) {
    setParameterByName('page', page + 1, hystory.location)
    hystory.push(hystory.location)
  }
  localStorage.setItem('pageArticles', page)
}
