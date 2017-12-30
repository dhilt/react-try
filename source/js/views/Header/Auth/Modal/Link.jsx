import React from 'react'

export const AuthModalLink = props =>
  props.isPending ? (
    <div>{'Авторизуем'}</div>
  ) : (
    props.isAuthorized ? (
      <div onClick={props.doLogout}>{`Выйти (${props.login})`}</div>
    ) : (
      <div onClick={props.doLogin}>{'Войти'}</div>
    )
  )
