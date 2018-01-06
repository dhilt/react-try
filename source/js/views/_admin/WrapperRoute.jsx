import React from 'react'
import { connect } from 'react-redux'

import NotFound from 'views/NotFound'

// Authorization HOC
const Protected = (RouteComponent, requiredRole) =>
  @connect(state => ({
    role: state.auth.get('userInfo') && state.auth.get('userInfo').get('role'),
    authPending: state.auth.get('tokenAuthPending')
  }))
  class Protected extends React.Component {

    render() {
      const { role, authPending } = this.props
      if (authPending) {
        return <div>{'Wait...'}</div>
      }
      if (role === requiredRole) {
        return <RouteComponent {...this.props} />
      } else {
        return <NotFound />
      }
    }
  }

export default Protected
