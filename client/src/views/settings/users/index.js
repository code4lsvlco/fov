import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefaultLayout } from '../../common';
import { UsersMuiTableURL } from './components/UsersMuiTableURL';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Paper } from 'material-ui';

import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

let Users = (props) => {
  return (
    <DefaultLayout>
      <Grid>
        <Cell col={12}>
          <Paper>
            <UsersMuiTableURL
              url="/users"
              idKey="_id"
              omitKeys={['_id', '__v', 'password']}
            />
          </Paper>
        </Cell>
      </Grid>
    </DefaultLayout>
  )
}

function mapStatetoProps(state) {
  return { ...state }
}

Users = connect(mapStatetoProps)(Users)

export { Users };
