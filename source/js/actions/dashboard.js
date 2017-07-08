import { asyncRequest } from '../helpers/request'

export const GET_DASHBOARD_ARTICLES_ASYNC_START = 'GET_DASHBOARD_ARTICLES_ASYNC_START'
export const GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS'
export const GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL = 'GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL'
export const UPDATE_DASHBOARD_ARTICLES = 'UPDATE_DASHBOARD_ARTICLES'
export const CLEAN_UP_DASHBOARD_ARTICLES = 'CLEAN_UP_DASHBOARD_ARTICLES'

export function getDashboardArticlesAsync(offset) {
  return (dispatch) => {
    offset = Number(offset);
    let offsetQuery = offset >= 0 ? `&offset=${offset}` : '';
    dispatch(getDashboardArticlesAsyncStart());
    asyncRequest('articles?dashboard' + offsetQuery)
      .then(result => dispatch(getDashboardArticlesAsyncEndSuccess(result.articles)))
      .catch(error => dispatch(getDashboardArticlesAsyncEndFail(error)));
  }
}

export function getDashboardArticlesAsyncStart() {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_START
  }
}

export function getDashboardArticlesAsyncEndSuccess(data) {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS,
    data
  }
}

export function getDashboardArticlesAsyncEndFail(error) {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL,
    error
  }
}

export function updateDashboardArticles(article) {
  return (dispatch, getState) => {
    if (getState().dashboard.get('articles').get('list').length == 0) {
      return null
    }
    let listArticles = getState().dashboard.get('articles').get('list').toJS()
    listArticles.forEach((item, index, array) => {
      if (item.id == article.id) {
        array[index] = article
      }
    })
    dispatch({
      type: UPDATE_DASHBOARD_ARTICLES,
      data: listArticles
    })
  }
}

export function cleanUpDashboardArticles() {
  return {
    type: CLEAN_UP_DASHBOARD_ARTICLES
  }
}
