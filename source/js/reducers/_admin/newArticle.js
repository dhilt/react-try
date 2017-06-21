import { Map } from 'immutable';

import { SET_TIME_ARTICLE } from 'actions/_admin/newArticle';

const initialState = Map({
  date: null,
  title: '',
  description: '',
  image: '',
  text: ''
});

const actionsMap = {
  [SET_TIME_ARTICLE]: (state, action) => {
    return state.merge({
      date: action.data
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
