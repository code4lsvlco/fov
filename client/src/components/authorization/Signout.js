import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/',
        // state: { from: props.location } // TODO
      }}/>
    );
  }
}

export default withRouter(connect(null, actions)(Signout));
