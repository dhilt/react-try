import { asyncRequest } from '../../helpers/request';

export const EDIT_EXIST_ARTICLE_ASYNC_START = 'EDIT_EXIST_ARTICLE_ASYNC_START';
export const EDIT_EXIST_ARTICLE_ASYNC_END_SUCCESS = 'EDIT_EXIST_ARTICLE_ASYNC_END_SUCCESS';
export const EDIT_EXIST_ARTICLE_ASYNC_END_FAIL = 'EDIT_EXIST_ARTICLE_ASYNC_END_FAIL';

export function editExistArticleAsync() {
  return (dispatch, getState) => {
    const article = {
      date: getState().admin.editArticle.get('date'),
      title: getState().admin.editArticle.get('title'),
      description: getState().admin.editArticle.get('description'),
      image: getState().admin.editArticle.get('image'),
      text: getState().admin.editArticle.get('text')
    };
    dispatch(editExistArticleAsyncStart());
    const query = 'articles/' + getState().admin.editArticle.get('idArticle');
    asyncRequest(query, 'put', { article: article })
      .then(result => dispatch(editExistArticleAsyncEndSuccess(result)))
      .catch(error => dispatch(editExistArticleAsyncEndFail(error)));
  }
}

export function editExistArticleAsyncStart() {
  return {
    type: EDIT_EXIST_ARTICLE_ASYNC_START
  }
}

export function editExistArticleAsyncEndSuccess(data) {
  return {
    type: EDIT_EXIST_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function editExistArticleAsyncEndFail(error) {
  return {
    type: EDIT_EXIST_ARTICLE_ASYNC_END_FAIL,
    error
  }
}
