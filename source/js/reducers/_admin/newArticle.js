import { Map } from 'immutable';

//import {} from 'actions/_admin/newArticle';

const initialState = Map({
});

const actionsMap = {
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
