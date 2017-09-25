import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefaultLayout, Row, CardBox, MuiBasicTable, MuiTableURL } from '../../common';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let Users = (props) => {
  return (
    <DefaultLayout>
      <div className="wrapper wrapper-content">
        <Row>
          <div className={"col-sm-12"} style={{ paddingBottom: 20}}>
            <MuiTableURL
              url="/users"
              idKey="_id"
              omitKeys={['_id', '__v', 'password']}
              
            />
          </div>
        </Row>
      </div>
    </DefaultLayout>
  )
}

function mapStatetoProps(state) {
  return { ...state }
}

Users = connect(mapStatetoProps)(Users)

export { Users };
