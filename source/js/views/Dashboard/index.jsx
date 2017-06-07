import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardHead from './Head';
import DashboardArticles from './Articles';

@connect(state => ({
}))
export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  constructor() {
    super();
  }
//<DashboardHead />
  render() {
    return (
      <div>
        <DashboardArticles />
      </div>
    );
  }
}
