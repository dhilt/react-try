import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

export default class Auth extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal () {
    this.setState({ showModal: true});
  }

  closeModal () {
    this.setState({ showModal: false});
  }

  render() {
    return (
      <div className='Auth'>
        <Link to='Login' onClick={this.openModal}>
          Login
        </Link>
        <ReactModal
          isOpen={this.state.showModal}
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