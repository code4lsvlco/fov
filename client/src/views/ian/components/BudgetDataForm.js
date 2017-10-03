import React from 'react';

import _ from 'lodash';
import accounting from 'accounting';

import { Paper, TextField } from 'material-ui';

import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css'

import BulletGraph from 'react-bullet-graph';

const getValues = (rows,field) => {
  var pattern         = /[^0-9.-]+/g;
  const values = rows.reduce(function(accumulator, row,) {
      return accumulator + parseFloat(row[field].replace(pattern,''));
    },0)
  return values
}

const BudgetDataForm = (props) => {
  let rows = props.rows;
  console.log(rows);
  let originalRows = props.originalRows;
  let original_budget, revised_budget, balance, remaining = 0;
  if (rows.length > 0) {
    original_budget = getValues(rows,"Original Budget");
    revised_budget = getValues(rows,"Revised Budget");
    balance = getValues(rows,"Balance");
    remaining = getValues(rows,"Remaining");
  };

  let percent_complete = revised_budget > 0 ? (balance/revised_budget * 100) : 100;
  percent_complete = balance == 0 ? 0 : percent_complete;

  const green = "#90EE90";
  const salmon = "#FA8072";
  const color = percent_complete > 100 ? salmon : green

  percent_complete = percent_complete + '%';

  let orgCodes = originalRows.map((row) => {return row["Org Code"]});
  orgCodes = _.uniq(orgCodes);
  let objCodes = originalRows.map((row) => {return row["Obj Code"]});
  objCodes = _.uniq(objCodes);

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const percent_ytd = accounting.toFixed(day/365 * 100,2);

  const percent_max = percent_complete > 100 ? percent_complete : 100;

  return (
    <div>
      <Grid>
        <Cell col={6}>
          <label>Organization Code</label>
          {/* onChange={props.handleOnChange} onSearch={props.handleOnSearch} */}
          <Multiselect
            data={orgCodes}
            filter='contains'
            onChange={props.handleOrgChange}
          />
        </Cell>
        <Cell col={6}>
          <label>Object Code</label>
          <Multiselect
            data={objCodes}
            filter='contains'
            onChange={props.handleObjChange}
          />
        </Cell>
      </Grid>
      {/* <Grid>
        <Cell col={2}>
          <label>Original Budget</label>
          <TextField></TextField>
        </Cell>
        <Cell col={2}>
          <label>Original Budget</label>
          <TextField></TextField>
        </Cell>
        <Cell col={2}>
          <label>Revised Budget</label>
          <TextField></TextField>
        </Cell>
        <Cell col={2}>
          <label>Balance</label>
          <TextField></TextField>
        </Cell>
        <Cell col={2}>
          <label>Remaining</label>
          <TextField></TextField>
        </Cell>
        <Cell col={2}>
          <label>Percent Spent</label>
          <TextField></TextField>
        </Cell>
      </Grid> */}
      <Grid>
        <Cell col={12}>
          <Paper>
            <div style={{overflow: 'hidden', padding: 10}}>
              <div style={{width: '20%', float: 'left'}}>
                <strong style={{ marginRight: 5 }}>Accounts:</strong>
                { rows.length }
              </div>
              <div style={{width: '20%', float: 'left'}}>
                <strong style={{ marginRight: 5 }}>Original Budget:</strong>
                { accounting.formatMoney(original_budget) }
              </div>
              <div style={{width: '20%', float: 'left'}}>
                <strong style={{ marginRight: 5 }}>Revised Budget:</strong>
                { accounting.formatMoney(revised_budget) }
              </div>
              <div style={{width: '20%', float: 'left'}}>
                <strong style={{ marginRight: 5 }}>Balance:</strong>
                { accounting.formatMoney(balance) }
              </div>
              <div style={{width: '20%', float: 'left'}}>
                <strong style={{ marginRight: 5 }}>Remaining:</strong>
                { accounting.formatMoney(remaining) }
              </div>
              <div className="progress" style={{marginTop: '30px', marginBottom: 0 }}>
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percent_complete, backgroundColor: color, color: '#666'}}>
                  { accounting.toFixed(percent_complete,0) }%
                </div>
                <div style={{position: 'relative', top: 0, left: `${percent_ytd}%`, height: '100%', width: 3, backgroundColor: 'black'}}></div>
              </div>
              {/* <div style={{padding: 20}}>
                <BulletGraph
                  scaleMin={0}
                  scaleMax={percent_max}
                  performanceVal={accounting.toFixed(percent_complete,2)}
                  badVal={20}
                  satisfactoryVal={90}
                  symbolMarker={percent_ytd}
                  height={30}
                  width={600}
                  badColor={"red"}
                  satisfactoryColor={"seagreen"}
                  goodColor={"#DDD"}
                  isActiveColor={true}
                  opacity={0.5}
               />
              </div> */}

            </div>
          </Paper>
        </Cell>
      </Grid>
    </div>
  )
}

export default BudgetDataForm;
