import React, { Component } from 'react';
import { connect } from 'react-redux';

import { storeHelper } from 'helpers';

@connect(state => ({
  initialized: state.admin.common.get('initialized')
}))
export default class NewArticle extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
    storeHelper.dispatchSetAdminReducerAction();
  }

  render() {
    return (
      <div>
        <h2>Route for creating articles...(only for admin)</h2>
        { this.props.initialized ? 'init' : 'no-init' }
      </div>
    );
  }
}
