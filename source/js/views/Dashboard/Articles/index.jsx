import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDashboardArticlesAsync } from 'actions/dashboard';

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  error: state.dashboard.get('articles').get('error'),
  list: state.dashboard.get('articles').get('list')
}))
export default class DashboardArticles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    list: PropTypes.array
  }

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(getDashboardArticlesAsync());
  }

  render() {
    return (
      <div>
        <span>DashboardArticles</span>
      </div>
    );
  }
}
