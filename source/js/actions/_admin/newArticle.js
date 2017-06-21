export const SET_TIME_ARTICLE = 'SET_TIME_ARTICLE';

export function setTimeArticle(date) {
  return {
    type: SET_TIME_ARTICLE,
    date
  }
}
