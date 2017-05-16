import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Auth extends Component {

  render() {
    return (
      <div className='Auth'>
        <Link to='login'>
          Вход
        </Link>
      </div>
    );
  }
}