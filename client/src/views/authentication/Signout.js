import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../state/ducks/authentication/actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/'
      }}/>
    );
  }
}

Signout = connect(null, actions)(Signout);
Signout = withRouter(Signout);
export { Signout };
