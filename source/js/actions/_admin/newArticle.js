import { asyncRequest } from '../../helpers/request';

export const CREATE_NEW_ARTICLE_ASYNC_START = 'CREATE_NEW_ARTICLE_ASYNC_START';
export const CREATE_NEW_ARTICLE_ASYNC_END_SUCCESS = 'CREATE_NEW_ARTICLE_ASYNC_END_SUCCESS';
export const CREATE_NEW_ARTICLE_ASYNC_END_FAIL = 'CREATE_NEW_ARTICLE_ASYNC_END_FAIL';

export function createNewArticleAsync() {
  return (dispatch, getState) => {
    const article = {
      date: getState().admin.newArticle.get('date'),
      title: getState().admin.newArticle.get('title'),
      description: getState().admin.newArticle.get('description'),
      image: getState().admin.newArticle.get('image'),
      text: getState().admin.newArticle.get('text')
    };
    dispatch(createNewArticleAsyncStart());
    asyncRequest('articles', 'post', { article: article })
      .then(result => dispatch(createNewArticleAsyncEndSuccess(result)))
      .catch(error => dispatch(createNewArticleAsyncEndFail(error)));
  }
}

export function createNewArticleAsyncStart() {
  return {
    type: CREATE_NEW_ARTICLE_ASYNC_START
  }
}

export function createNewArticleAsyncEndSuccess(data) {
  return {
    type: CREATE_NEW_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function createNewArticleAsyncEndFail(error) {
  return {
    type: CREATE_NEW_ARTICLE_ASYNC_END_FAIL,
    error
  }
}
