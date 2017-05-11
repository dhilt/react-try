import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { routeCodes } from '../../routes';

export default class Menu extends Component {

  render() {
    return (
      <div className='Menu'>
        <IndexLink to='News'>
          Новости
        </IndexLink>

        <Link to='Articles'>
          Статьи
        </Link>

        <Link to='Video'>
          Видео
        </Link>

        <Link to='Games'>
          Игры
        </Link>

        <Link to='More'>
          Еще
        </Link>
      </div>
    );
  }
}
