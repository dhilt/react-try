import { combineReducers } from 'redux';
import { Map } from 'immutable';

import setRootReducer from '../';
import { storeHelper } from 'helpers';

import common from './common';
import newArticle from './newArticle';

export let adminReducers = combineReducers({
  common
});

export function setAdminReducer() {
  adminReducers = combineReducers({
    common,
    newArticle
  });  
}
