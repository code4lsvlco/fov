import React from 'react';
import { DefaultLayout, DataGridURL, Row, CardBox } from '../common'
import { BudgetBox } from './components/BudgetBox';
import { Paper } from 'material-ui';

import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

const Ian = () => {
  return (
    <div>
      <DefaultLayout>
        <Grid>
          <Cell col={12}>
            <Paper>
              <BudgetBox url='/api/ian/budget/expenses'/>
            </Paper>
          </Cell>
        </Grid>
      </DefaultLayout>
    </div>
  )
}

export { Ian };
