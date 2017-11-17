import React, { Component } from 'react'

import Menu from './Menu/index'

export default class Header extends Component {
  render() {
    return (
      <div className='page-header'>
        <Menu />
      </div>
    )
  }
}
