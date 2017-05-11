import React, { Component } from 'react';

import Menu from './Menu';
import Auth from './Auth';

export default class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <Menu />
        <Auth />
      </div>
    );
  }
}
