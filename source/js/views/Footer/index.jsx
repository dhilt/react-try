import React, { Component } from 'react'

import SocialTable from 'views/Footer/SocialTable'
import BottomImages from 'views/Footer/BottomImages'

export default class Footer extends Component {
  render() {
    return (
      <div className='page-footer'>
        <SocialTable />
        <BottomImages />
      </div>
    )
  }
}
