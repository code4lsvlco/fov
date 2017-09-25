// Usage: <Route path="/some_private_route" component={RequireAuth(Template)} />

import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    render() {
      if (!this.props.authenticated) {
        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: this.props.location.pathname }
            }}
          />
        )
      } else {
        return (<ComposedComponent {...this.props} />)
      }
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authentication.authenticated };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}
