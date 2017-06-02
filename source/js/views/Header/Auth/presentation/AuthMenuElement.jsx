import React, { Component } from 'react';

export const AuthMenuElement = props => {

  let authMenuElement = null;
  if (props.tokenAuthPending) {
    authMenuElement = <div>{'Авторизуем'}</div>
  } else {
     if (props.isAuthorized) {
      authMenuElement = <div onClick={props.doLogout}>{'Выйти '} ({props.login})</div>
    } else {
      authMenuElement = <div onClick={props.openModal}>{'Войти'}</div>
    }
  }

  return (
    <div>{authMenuElement}</div>
  );
}
