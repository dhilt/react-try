import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div className='page-about'>
        <h2>{'About'}</h2>
        <hr />

        <h3>{'React and Redux, Webpack 2 boilerplate'}</h3>
        <span>{'Visit documentation on '}</span>
        <a href='https://github.com/Stanko/react-redux-webpack2-boilerplate'>{'GitHub'}</a>
      </div>
    )
  }
}
