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
  loginPending: state.auth.get('loginPending'),
  isLoginValid: state.auth.get('isLoginValid'),
  isPasswordValid: state.auth.get('isPasswordValid'),
  errors: state.auth.get('errors')
}))
export default class Auth extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    userInfo: PropTypes.object,
    login: PropTypes.string,
    password: PropTypes.string,
    loginPending: PropTypes.bool,
    isLoginValid: PropTypes.bool,
    isPasswordValid: PropTypes.bool,
    errors: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor () {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.buttonLogin = this.buttonLogin.bind(this);
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

  buttonLogin () {
    this.props.dispatch(doLoginAsync(this.props.login, this.props.password));
  }

  render() {
    let { dialogOpen, login, password, isLoginValid, isPasswordValid, errors } = this.props;
    let listErrors = this.props.errors.map((error) => <div>{error}</div> );
    return (
      <div className='Auth'>
        <div onClick={this.openModal}>
          Login
        </div>
        <ReactModal
          isOpen={dialogOpen}
          contentLabel='Authorization Modal'
          className='Modal'
          overlayClassName='Overlay'
        >
          <div>
            <label>Login</label>
            {isLoginValid && <input type='text' placeholder='User' value={login} onChange={this.changeLogin}></input>}
            {!isLoginValid && <input type='text' className='invalidInput' placeholder='User' value={login} onChange={this.changeLogin}></input>}
          </div>
          <div>
            <label>Password</label>
            {isPasswordValid && <input type='password' placeholder='**********' value={password} onChange={this.changePassword}></input>}
            {!isPasswordValid && <input type='password' className='invalidInput' placeholder='**********' value={password} onChange={this.changePassword}></input>}
          </div>
          <div>
            <button disabled={ !isLoginValid && !isPasswordValid } onClick={this.buttonLogin}>Log in</button>
            <button onClick={this.closeModal}>Close Modal</button>
          </div>
          <ul>{listErrors}</ul>
        </ReactModal>
      </div>
    );
  }
}