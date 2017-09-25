// Usage: <PrivateRoute path="/some_private_route" component={Template}/>

import React, { Component } from "react";
// import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = props => {
  const { component: Component, authenticated, ...rest } = props;
  if (authenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location.pathname }
            }}
          />
        )}
      />
    );
  }
};

// function mapStatetoProps(state) {
//   return { authenticated: state.authentication.authenticated };
// }

// PrivateRoute = connect(mapStatetoProps)(PrivateRoute)
// PrivateRoute = withRouter(PrivateRoute);
export { PrivateRoute };
