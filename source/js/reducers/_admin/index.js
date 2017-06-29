import { combineReducers } from 'redux';
import { createForms, combineForms } from 'react-redux-form/immutable';
import { Map } from 'immutable';

import setRootReducer from '../';
import { storeHelper } from 'helpers/store';

import common from './common';
import newArticle, { initialState as newArticleInitialState } from './newArticle';
import editArticle, { initialArticleModel } from './editArticle';

// export let adminReducers = combineReducers({
//   common
// });

export function setAdminReducer() {
  adminReducers = combineReducers({
    common,
    ...createForms({
      newArticle: newArticleInitialState,
      editArticle: initialArticleModel
    }),
  });
}

export let adminReducers = {
  _adminCommon: common,
  _adminForms: combineForms({
    newArticleModel: newArticleInitialState,
    editArticleModel: initialArticleModel
  }),
  _adminNewArticle: newArticle,
  _adminEditArticle: editArticle
}
