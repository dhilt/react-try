import { combineReducers } from 'redux'
import { createForms, combineForms } from 'react-redux-form/immutable'
import { Map } from 'immutable'

import setRootReducer from '../'
import { storeHelper } from 'helpers/store'

import common from './common'
import newArticle from './newArticle'
import editArticle from './editArticle'
import removeArticle from './removeArticle'
import confirmation from './confirmation'

import { articleModel } from 'helpers/models'

// export let adminReducers = combineReducers({
//   common
// });

export function setAdminReducer() {
  adminReducers = combineReducers({
    common,
    ...createForms({
      newArticle: Map(articleModel),
      editArticle: Map(articleModel)
    }),
  });
}

export let adminReducers = {
  _adminCommon: common,
  _adminForms: combineForms({
    newArticleModel: Map(articleModel),
    editArticleModel: Map(articleModel)
  }),
  _adminNewArticle: newArticle,
  _adminEditArticle: editArticle,
  _adminRemoveArticle: removeArticle,
  _adminConfirmation: confirmation
}
