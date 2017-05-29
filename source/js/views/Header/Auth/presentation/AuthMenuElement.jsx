import { openLoginModal, doLogout } from 'actions/auth';
import PropTypes from 'prop-types';

export const AuthMenuElement = props => {

  let authMenuElement = null;
  if (props.tokenAuthPending) {
    authMenuElement = <div>{'Авторизуем'}</div>
  } else {
     if (props.isAuthorized) {
      authMenuElement = <div onClick={props.dispatch(doLogout)}>Выйти ({props.userInfo.get('login')})</div>
    } else {
      authMenuElement = <div onClick={props.dispatch(openLoginModal)}>Войти</div>
    }
  }

  return (
    <div>{authMenuElement}</div>
  );
}
