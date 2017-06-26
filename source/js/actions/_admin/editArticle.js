import { asyncRequest } from '../../helpers/request';

export const EDIT_ARTICLE_ASYNC_START = 'EDIT_ARTICLE_ASYNC_START';
export const EDIT_ARTICLE_ASYNC_END_SUCCESS = 'EDIT_ARTICLE_ASYNC_END_SUCCESS';
export const EDIT_ARTICLE_ASYNC_END_FAIL = 'EDIT_ARTICLE_ASYNC_END_FAIL';

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

    // todo : need to get original article id (admin.editArticle.source.id)
    const query = 'articles/' + getState().admin.editArticle.get('idArticle');

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
