import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Main, Row, Ibox } from '../common';

let Users = (props) => {
  return (
    <Main>
      <div className="wrapper wrapper-content">
        <Row>
          <Ibox width="12" title="Users">
            Users
          </Ibox>
        </Row>
      </div>
    </Main>
  )
}

function mapStatetoProps(state) {
  return { ...state }
}

Users = connect(mapStatetoProps)(Users)

export { Users };
