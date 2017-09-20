import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  if (authenticated) {
    return (<Route {...rest} render={(props) => (<Component {...props}/>)}/>)
  } else {
    // TODO - put in url for redirect from.
    return (<Route {...rest} render={(props) => (<Redirect to={{pathname: '/signin',state: { from: "/" }}}/>)}/>)
  }
}

function mapStatetoProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default withRouter(connect(mapStatetoProps)(PrivateRoute));
