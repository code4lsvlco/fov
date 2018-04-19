import React, { Component } from 'react';
import axios from 'axios';

import { Paper } from 'material-ui';

import { Grid, Cell } from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

import { DefaultLayout } from '../common';

class FleetMapTrips extends Component {

  render() {
    return (
      <DefaultLayout>
        <Grid>
          <Cell col={12}>
            <Paper>
              Test
            </Paper>
          </Cell>
        </Grid>
      </DefaultLayout>
    )
  }

}

export { FleetMapTrips };