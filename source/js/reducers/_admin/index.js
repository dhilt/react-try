import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form/immutable';
import { Map } from 'immutable';

import setRootReducer from '../';
import { storeHelper } from 'helpers/store';

import common from './common';
import newArticle from './newArticle';

export let adminReducers = combineReducers({
  common
});

export function setAdminReducer() {
  adminReducers = combineReducers({
    common,
    ...createForms({
      newArticle,
    }),
  });  
}
