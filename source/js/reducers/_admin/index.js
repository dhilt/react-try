import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form/immutable';
import { Map } from 'immutable';

import setRootReducer from '../';
import { storeHelper } from 'helpers/store';

import common from './common';
import { initialState as newArticleInitialState } from './newArticle';
import { initialState as editArticleInitialState } from './editArticle';

export let adminReducers = combineReducers({
  common
});

export function setAdminReducer() {
  adminReducers = combineReducers({
    common,
    ...createForms({
      newArticle: newArticleInitialState,
      editArticle: editArticleInitialState
    }),
  });  
}
