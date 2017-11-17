import React, { Component } from 'react'
import ReactModal from 'react-modal'

export const AuthModal = props => {

  function renderErrors (errors, apiError) {
    let result = []
    errors.forEach(error => result.push(error))
    if(apiError) {
      result.push(apiError)
    }
    result = result.map((error, key) => <div key={key}>{error}</div>)
    return result
  }

  function changeLogin (event) {
    props.changeLogin(event)
  }

  function changePassword (event) {
    props.changePassword(event)
  }

  return (
    <ReactModal
      isOpen={props.dialogOpen}
      contentLabel='Authorization Modal'
      className='header-auth-modal'
      overlayClassName='Overlay'
    >
      <div>
        <label>{'Login'}</label>
        <input
          type='text'
          placeholder='Username'
          value={props.login}
          onChange={props.changeLogin}
          className={!props.isLoginValid ? 'auth-invalid-input' : ''}/>
      </div>
      <div>
        <label>{'Password'}</label>
        <input
          type='password'
          placeholder='**********'
          value={props.password}
          onChange={props.changePassword}
          className={!props.isPasswordValid ? 'auth-invalid-input' : ''}/>
      </div>
      <div>
        <button type='button' disabled={props.errors.size || props.loginPending || props.login === '' || props.password === ''} onClick={props.doLogin}>{'Log in'}</button>
        <button type='button' onClick={props.closeModal}>{'Close Modal'}</button>
      </div>
      {renderErrors(props.errors, props.apiError)}
    </ReactModal>
  )
}
