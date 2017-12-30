import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { AuthModalLink } from './Modal/Link'
import { AuthModal } from './Modal'

import {
  changePasswordString,
  changeLoginString,
  closeLoginModal,
  openLoginModal,
  validateForm,
  doLoginAsync,
  doLogout
} from 'actions/auth'

@connect(state => ({
  userLogin: state.auth.get('userInfo').get('login'),
  tokenAuthPending: state.auth.get('tokenAuthPending'),
  isPasswordValid: state.auth.get('isPasswordValid'),
  loginPending: state.auth.get('loginPending'),
  isLoginValid: state.auth.get('isLoginValid'),
  isAuthorized: state.auth.get('isAuthorized'),
  dialogOpen: state.auth.get('dialogOpen'),
  password: state.auth.get('password'),
  apiError: state.auth.get('apiError'),
  errors: state.auth.get('errors'),
  login: state.auth.get('login')
}))
export default class AuthComponent extends Component {
  static propTypes = {
    tokenAuthPending: PropTypes.bool,
    isPasswordValid: PropTypes.bool,
    isAuthorized: PropTypes.bool,
    loginPending: PropTypes.bool,
    isLoginValid: PropTypes.bool,
    userLogin: PropTypes.string,
    dialogOpen: PropTypes.bool,
    apiError: PropTypes.string,
    password: PropTypes.string,
    login: PropTypes.string,
    errors: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor () {
    super()
    this.changePassword = this.changePassword.bind(this)
    this.changeLogin = this.changeLogin.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.doLogout = this.doLogout.bind(this)
    this.doLogin = this.doLogin.bind(this)
  }

  openModal () {
    this.props.dispatch(openLoginModal())
  }

  closeModal () {
    this.props.dispatch(closeLoginModal())
  }

  changeLogin (event) {
    this.props.dispatch(changeLoginString(event.target.value))
    this.props.dispatch(validateForm(event.target.value, this.props.password))
  }

  changePassword (event) {
    this.props.dispatch(changePasswordString(event.target.value))
    this.props.dispatch(validateForm(this.props.login, event.target.value))
  }

  doLogin () {
    this.props.dispatch(doLoginAsync(this.props.login, this.props.password))
  }

  doLogout () {
    this.props.dispatch(doLogout())
  }

  render() {
    const { dialogOpen, errors, login, password, isLoginValid, isPasswordValid,
      loginPending, apiError, tokenAuthPending, userLogin, isAuthorized
    } = this.props
    return (
      <div className="header-auth">
        <AuthModalLink
          doLogin={this.openModal}
          doLogout={this.doLogout}
          isPending={tokenAuthPending}
          isAuthorized={isAuthorized}
          login={userLogin}
        />
        <AuthModal
          changePassword={this.changePassword}
          changeLogin={this.changeLogin}
          closeModal={this.closeModal}
          doLogin={this.doLogin}
          isPasswordValid={isPasswordValid}
          isLoginValid={isLoginValid}
          loginPending={loginPending}
          dialogOpen={dialogOpen}
          apiError={apiError}
          password={password}
          errors={errors}
          login={login}
        />
      </div>
    )
  }
}
