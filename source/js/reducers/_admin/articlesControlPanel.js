import { Map } from 'immutable';

import {
  WRITE_ID_ARTICLE,
  VALIDATE_ID_ARTICLE
} from 'actions/_admin/articlesControlPanel';

export const initialState = Map({
  idArticle: '',
  isValid: false
});

const actionsMap = {
  [WRITE_ID_ARTICLE]: (state, action) => {
    return state.merge({
      idArticle: action.idArticle
    })
  },
  [VALIDATE_ID_ARTICLE]: (state, action) => {
    return state.merge({
      isValid: action.isValid
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
