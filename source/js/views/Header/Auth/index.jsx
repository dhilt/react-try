import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

import { openLoginModal, closeLoginModal, changeLoginString, changePasswordString, validateForm, doLoginAsync } from 'actions/auth';

@connect(state => ({
  dialogOpen: state.auth.get('dialogOpen'),
  userInfo: state.auth.get('userInfo'),
  login: state.auth.get('login'),
  password: state.auth.get('password'),
  tokenAuthPending: state.auth.get('tokenAuthPending'),
  loginPending: state.auth.get('loginPending'),
  isLoginValid: state.auth.get('isLoginValid'),
  isPasswordValid: state.auth.get('isPasswordValid'),
  errors: state.auth.get('errors'),
  apiError: state.auth.get('apiError')
}))
export default class Auth extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    userInfo: PropTypes.object,
    login: PropTypes.string,
    password: PropTypes.string,
    tokenAuthPending: PropTypes.bool,
    loginPending: PropTypes.bool,
    isLoginValid: PropTypes.bool,
    isPasswordValid: PropTypes.bool,
    errors: PropTypes.array,
    apiError: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor () {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  openModal () {
    this.props.dispatch(openLoginModal());
  }

  closeModal () {
    this.props.dispatch(closeLoginModal());
  }

  changeLogin (event) {
    this.props.dispatch(changeLoginString(event.target.value));
    this.props.dispatch(validateForm(event.target.value, this.props.password));
  }

  changePassword (event) {
    this.props.dispatch(changePasswordString(event.target.value));
    this.props.dispatch(validateForm(this.props.login, event.target.value));
  }

  doLogin () {
    this.props.dispatch(doLoginAsync(this.props.login, this.props.password));
  }

  renderErrors (errors, apiError) {
    let result = [];
    errors.forEach(error => result.push(error));
    if(apiError) {
      result.push(apiError);
    }
    result = result.map((error, key) => <div key={key}>{error}</div>);
    return result;
  }

  render() {
    let { dialogOpen, login, password, isLoginValid, isPasswordValid, errors, loginPending, apiError, tokenAuthPending, userInfo } = this.props;
    return (
      <div className='Auth'>
        <div onClick={this.openModal}>
          {tokenAuthPending && 'Авторизуем'}
          {!userInfo && !tokenAuthPending && 'Login'}
          {userInfo && !tokenAuthPending && 'Logout'}
        </div>
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
              onChange={this.changeLogin}
              className={!isLoginValid ? 'invalidInput' : ''}/>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              placeholder='**********'
              value={password}
              onChange={this.changePassword}
              className={!isPasswordValid ? 'invalidInput' : ''}/>
          </div>
          <div>
            <button type="button" disabled={errors.size || loginPending} onClick={this.doLogin}>Log in</button>
            <button type="button" onClick={this.closeModal}>Close Modal</button>
          </div>
          {this.renderErrors(errors, apiError)}
        </ReactModal>
      </div>
    );
  }
}