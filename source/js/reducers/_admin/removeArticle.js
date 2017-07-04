import { Map } from 'immutable';

import {
  REMOVE_ARTICLE_ASYNC_START,
  REMOVE_ARTICLE_ASYNC_END_SUCCESS,
  REMOVE_ARTICLE_ASYNC_END_FAIL,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL
} from 'actions/_admin/removeArticle';

const initialState = Map({
  pending: false,
  isRemovedArticle: false,
  isOpenModal: false,
  serverResult: null
});

const actionsMap = {
  [REMOVE_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [REMOVE_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      isRemovedArticle: true,
      serverResult: action.data
    })
  },
  [REMOVE_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.error
    })
  },
  [OPEN_CONFIRMATION_MODAL]: (state) => {
    return state.merge({
      isOpenModal: true
    })
  },
  [CLOSE_CONFIRMATION_MODAL]: (state) => {
    return state.merge({
      isOpenModal: false
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
