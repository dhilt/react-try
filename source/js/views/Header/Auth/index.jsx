import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

import { openLoginModal, closeLoginModal, changeLoginString, changePasswordString } from 'actions/auth';

@connect(state => ({
  dialogOpen: state.auth.get('dialogOpen'),
  login: state.auth.get('login'),
  password: state.auth.get('password')
}))
export default class Auth extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    login: PropTypes.string,
    password: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor () {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  openModal () {
    this.props.dispatch(openLoginModal());
  }

  closeModal () {
    this.props.dispatch(closeLoginModal());
  }

  changeLogin (event) {
    this.props.dispatch(changeLoginString(event.target.value));
  }

  changePassword (event) {
    this.props.dispatch(changePasswordString(event.target.value));
  }

  render() {
    let { dialogOpen } = this.props;
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
            <input type='text' placeholder='User' value={dialogOpen.login} onChange={this.changeLogin}></input>
          </div>
          <div>
            <label>Password</label>
            <input type='password' placeholder='**********' value={dialogOpen.password} onChange={this.changePassword}></input>
          </div>
          <div>
            <button>Log in</button>
            <button onClick={this.closeModal}>Close Modal</button>
          </div>
        </ReactModal>
      </div>
    );
  }
}