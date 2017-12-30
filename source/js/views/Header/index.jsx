import React from 'react'
import { Link } from 'react-router-dom'

import Authorization from './Auth'

export default Header =>
  <div className="header">
    <Link to='/'>
      <img src="/assets/img/logo.png" />
    </Link>
    <Link to='/news'>{'Новости'}</Link>
    <Link to='/articles'>{'Статьи'}</Link>
    <Link to='/videos'>{'Видео'}</Link>
    <Link to='/games'>{'Игры'}</Link>
    <Link to='/about'>{'О проекте'}</Link>
    <Authorization />
  </div>
