import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from '../Auth/AuthContainer'

export default class Menu extends Component {
  render() {
    return (
      <div className='Menu'>
        <Link to='/'>
          <img src='/assets/img/logo.png' />
        </Link>
        <Link to='/news'>{'Новости'}</Link>
        <Link to='/articles'>{'Статьи'}</Link>
        <Link to='/videos'>{'Видео'}</Link>
        <Link to='/games'>{'Игры'}</Link>
        <Link to='/about'>{'О проекте'}</Link>
        <AuthContainer className='Auth' />        
      </div>
    )
  }
}
