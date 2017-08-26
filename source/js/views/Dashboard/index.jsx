import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
