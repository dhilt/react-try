import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from 'views/Header/index'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <Header />
        <div className='MainContent'>{ children }</div>
      </div>
    );
  }
}
