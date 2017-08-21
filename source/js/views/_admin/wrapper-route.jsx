import React, { Component } from 'react'
import { connect } from 'react-redux'

// Authorization HOC
const Protected = (routeComponent) =>
  @connect(state => ({
    role: state.auth.get('userInfo') && state.auth.get('userInfo').get('role'),
    authPending: state.auth.get('tokenAuthPending')
  }))
  class Protected extends Component {
    constructor(props) {
      super(props)
      this.state = {
        requiredRole: 1  // admin role
      }
    }

    render() {
      const { role, authPending } = this.props
      const { requiredRole } = this.state
      if (authPending) {
        return <div>{'Wait...'}</div>
      }
      if (role === requiredRole) {
        return <routeComponent {...this.props} />
      } else {
        return <div>{'Page 404'}</div>
      }
    }
  }

export default Protected
