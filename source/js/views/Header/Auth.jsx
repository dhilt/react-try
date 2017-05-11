import React, { Component } from 'react';
import { IndexLink } from 'react-router';
// import { routeCodes } from '../../routes';

export default class Auth extends Component {

  render() {
    return (
      <div className='Auth'>
        <IndexLink to='login'>
          Войти
        </IndexLink>
      </div>
    );
  }
}