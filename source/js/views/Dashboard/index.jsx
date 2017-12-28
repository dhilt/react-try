import React, { Component } from 'react'

import DashboardHead from './Head'
import DashboardArticles from './Articles'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <DashboardHead />
        <DashboardArticles />
      </div>
    )
  }
}
