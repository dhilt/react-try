import React, { Component } from 'react';

import Menu from './Menu/index';
import AuthContainer from './Auth/AuthContainer';
import Content from './Content/index';

export default class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <Menu />
        <AuthContainer />
        <Content />
      </div>
    );
  }
}
