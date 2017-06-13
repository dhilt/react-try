import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import AuthContainer from '../Auth/AuthContainer';

export default class Menu extends Component {

  render() {
    let Authorization = {};
    return (
      <div className='Menu'>
        <IndexLink to='/'>
          <img src="assets/img/logo.png" />
        </IndexLink>
        <Link to='/news'>
          Новости
        </Link>
        <Link to='/articles'>
          Статьи
        </Link>

        <Link to='/videos'>
          Видео
        </Link>

        <Link to='/games'>
          Игры
        </Link>

        <Link to='/about'>
          О проекте
        </Link>
        
        <AuthContainer className='Auth'/>        
      </div>
    );
  }
}
