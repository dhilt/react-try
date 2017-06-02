import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import { AuthMenuElement } from './presentation/AuthMenuElement';
import { AuthModal } from './presentation/AuthModal';

import { openLoginModal, closeLoginModal, changeLoginString, changePasswordString, validateForm, doLoginAsync, doLogout } from 'actions/auth';

@connect(state => ({
  dialogOpen: state.auth.get('dialogOpen'),
  isAuthorized: state.auth.get('isAuthorized'),
  userInfoLogin: state.auth.get('userInfo').get('login'),
  login: state.auth.get('login'),
  password: state.auth.get('password'),
  tokenAuthPending: state.auth.get('tokenAuthPending'),
  loginPending: state.auth.get('loginPending'),
  isLoginValid: state.auth.get('isLoginValid'),
  isPasswordValid: state.auth.get('isPasswordValid'),
  errors: state.auth.get('errors'),
  apiError: state.auth.get('apiError')
}))
export default class AuthContainer extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    isAuthorized: PropTypes.bool,
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
    this.doLogout = this.doLogout.bind(this);
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

  doLogout () {
    this.props.dispatch(doLogout());
  }

  render() {
    let { dialogOpen, isAuthorized, login, password, isLoginValid, isPasswordValid, errors, loginPending, apiError, tokenAuthPending, userInfoLogin } = this.props;
    return (
      <div className='Auth'>
        <AuthMenuElement
          tokenAuthPending={tokenAuthPending}
          isAuthorized={isAuthorized}
          login={userInfoLogin}
          doLogout={this.doLogout}
          openModal={this.openModal} />
        <AuthModal
          errors={errors}
          apiError={apiError}
          dialogOpen={dialogOpen}
          loginPending={loginPending}
          closeModal={this.closeModal}
          doLogin={this.doLogin}
          changePassword={this.changePassword}
          changeLogin={this.changeLogin}
          login={login}
          password={password}
          isLoginValid={isLoginValid}
          isPasswordValid={isPasswordValid} />
      </div>
    );
  }
}
