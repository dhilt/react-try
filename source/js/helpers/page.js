import { browserHistory } from 'react-router'

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
