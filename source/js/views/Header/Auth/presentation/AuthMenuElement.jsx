import React, { Component } from 'react'

export const AuthMenuElement = props => {
  const {isPending, isAuthorized, login, doLogout, doLogin} = props

  return isPending ? (
    <div>{'Авторизуем'}</div>
  ) : (
    isAuthorized ? (
      <div onClick={doLogout}>{`Выйти (${login})`}</div>
    ) : (
      <div onClick={doLogin}>{'Войти'}</div>
    )
  )
}
