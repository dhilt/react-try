import { changeLoginString, changePasswordString, validateForm, doLoginAsync, closeLoginModal } from 'actions/auth';
import PropTypes from 'prop-types';

export const AuthModal = props => {

  let { dialogOpen, isAuthorized, login, password, isLoginValid, isPasswordValid, errors, loginPending, apiError, tokenAuthPending, userInfo } = props;
  return (
    <ReactModal
      isOpen={dialogOpen}
      contentLabel='Authorization Modal'
      className='Modal'
      overlayClassName='Overlay'
    >
      <div>
        <label>Login</label>
        <input
          type='text'
          placeholder='User'
          value={login}
          onChange={props.dispatch(changeLoginString)}
          className={!isLoginValid ? 'invalidInput' : ''}/>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          placeholder='**********'
          value={password}
          onChange={props.dispatch(changePasswordString)}
          className={!isPasswordValid ? 'invalidInput' : ''}/>
      </div>
      <div>
        <button type="button" disabled={errors.size || loginPending} onClick={props.dispatch(doLoginAsync)}>Log in</button>
        <button type="button" onClick={props.dispatch(closeLoginModal)}>Close Modal</button>
      </div>
      {this.renderErrors(errors, apiError)}
    </ReactModal>
  );
}