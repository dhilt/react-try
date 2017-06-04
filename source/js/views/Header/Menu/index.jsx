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
        <Link to='News'>
          Новости
        </Link>
        <Link to='Articles'>
          Статьи
        </Link>

        <Link to='Videos'>
          Видео
        </Link>

        <Link to='Games'>
          Игры
        </Link>

        <Link to='More'>
          Еще
        </Link>
        
        <AuthContainer className='Auth'/>        
      </div>
    );
  }
}
