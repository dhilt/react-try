import { asyncRequest } from '../../helpers/request';

export const EDIT_ARTICLE_ASYNC_START = 'EDIT_ARTICLE_ASYNC_START';
export const EDIT_ARTICLE_ASYNC_END_SUCCESS = 'EDIT_ARTICLE_ASYNC_END_SUCCESS';
export const EDIT_ARTICLE_ASYNC_END_FAIL = 'EDIT_ARTICLE_ASYNC_END_FAIL';
export const SET_EDIT_PAGE_SOURCE = 'SET_EDIT_PAGE_SOURCE';

export function editArticleAsync() {
  return (dispatch, getState) => {
    const article = {
      date: getState().admin.editArticle.get('date'),
      title: getState().admin.editArticle.get('title'),
      description: getState().admin.editArticle.get('description'),
      image: getState().admin.editArticle.get('image'),
      text: getState().admin.editArticle.get('text')
    };
    dispatch(editArticleAsyncStart());
    const query = 'articles/' + getState().admin.editArticle.get('source').get('id');
    asyncRequest(query, 'put', { article })
      .then(result => dispatch(editArticleAsyncEndSuccess(result)))
      .catch(error => dispatch(editArticleAsyncEndFail(error)));
  }
}

export function editArticleAsyncStart() {
  return {
    type: EDIT_ARTICLE_ASYNC_START
  }
}

export function editArticleAsyncEndSuccess(data) {
  return {
    type: EDIT_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function editArticleAsyncEndFail(error) {
  return {
    type: EDIT_ARTICLE_ASYNC_END_FAIL,
    error
  }
}

export function setEditPageSource() {
  return (dispatch, getState) => {
    const article = {
      id: getState().article.get('data').get('id'),
      userId: getState().article.get('data').get('userId'),
      userName: getState().article.get('data').get('userName'),
      createdAt: getState().article.get('data').get('createdAt'),
      title: getState().article.get('data').get('title'),
      description: getState().article.get('data').get('description'),
      text: getState().article.get('data').get('text'),
      image: getState().article.get('data').get('image'),
    };
    dispatch(setEditPage(article));
  }
}

export function setEditPage(data) {
  return {
    type: SET_EDIT_PAGE_SOURCE,
    data
  }
}
