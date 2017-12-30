import React from 'react'
import ReactModal from 'react-modal'

export const AuthModal = props => {

  const renderErrors = (errors, apiError) => {
    let result = []
    errors.forEach(error => result.push(error))
    if(apiError) {
      result.push(apiError)
    }
    result = result.map((error, key) => <div key={key}>{error}</div>)
    return result
  }

  const changeLogin = (event) => {
    props.changeLogin(event)
  }

  const changePassword = (event) => {
    props.changePassword(event)
  }

  return (
    <ReactModal
      isOpen={props.dialogOpen}
      contentLabel="Authorization Modal"
      className="header-auth-modal"
      overlayClassName="Overlay">
      <div>
        <label>{'Login'}</label>
        <input
          className={props.isLoginValid ? '' : 'auth-invalid-input'}
          onChange={props.changeLogin}
          value={props.login}
          placeholder="Username"
          type="text"
        />
      </div>
      <div>
        <label>{'Password'}</label>
        <input
          className={props.isPasswordValid ? '' : 'auth-invalid-input'}
          onChange={props.changePassword}
          value={props.password}
          placeholder="**********"
          type="password"
        />
      </div>
      <div>
        <button type="button"
          disabled={props.errors.size || props.loginPending || props.login === '' || props.password === ''}
          onClick={props.doLogin}>{'Log in'}
        </button>
        <button type="button"
          onClick={props.closeModal}>{'Close Modal'}
        </button>
      </div>
      {renderErrors(props.errors, props.apiError)}
    </ReactModal>
  )
}
