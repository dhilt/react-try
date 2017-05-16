import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

import { openLoginModal, closeLoginModal } from 'actions/auth';

@connect(state => ({
  dialogOpen: state.auth.get('dialogOpen')
}))
export default class Auth extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor () {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal () {
    this.props.dispatch(openLoginModal());
  }

  closeModal () {
    this.props.dispatch(closeLoginModal());
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
            <input type='text' placeholder='User'></input>
          </div>
          <div>
            <label>Password</label>
            <input type='password' placeholder='**********'></input>
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