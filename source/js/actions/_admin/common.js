export const SET_ADMIN_REDUCERS = 'SET_ADMIN_REDUCERS'
import { storeHelper } from 'helpers/store'

export function setAdminReducerAction() {
  return (dispatch, getState) => {
    if (getState().admin.common.get('initialized')) {
      return
    }
    storeHelper.setAdminReducer()
    dispatch({
      type: SET_ADMIN_REDUCERS
    })
  }
}
