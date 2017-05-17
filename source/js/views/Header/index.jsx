import React, { Component } from 'react';

import Menu from './Menu/index';
import Auth from './Auth/index';
import Content from './Content/index';

export default class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <Menu />
        <Auth />
        <Content />
      </div>
    );
  }
}
