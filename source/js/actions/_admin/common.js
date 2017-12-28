import { storeHelper } from 'helpers/store'

export const SET_ADMIN_REDUCERS = 'SET_ADMIN_REDUCERS'

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
