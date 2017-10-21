import React, { Component } from 'react';
import { Grid, Cell } from 'material-grid';
import { Paper } from 'material-ui';
import { Statistic } from 'semantic-ui-react';
import { DefaultLayout } from '../common';
import { StatisticURL } from './components/StatisticURL';
import { ChartDateTime, DataGridURL } from '../common';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

import 'semantic-ui-css/semantic.min.css';

class Scada extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     raw: {
  //       eldorado: {},
  //       ncwcd: {},
  //     },
  //     treatment: {
  //       scwtp: {
  //         flowEffluent: 0
  //       },
  //       hbwtp: {},
  //     },
  //     distribution: {
  //       low: {},
  //       mid: {},
  //       high: {}
  //     },
  //   };
  // }

  // componentDidMount() {
  //
  // }

  render() {
    return (
      <DefaultLayout>
        <Grid>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/scwtp/lowzone_flow/current'
                  label='SCWTP Low Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/scwtp/midzone_flow/current'
                  label='SCWTP Mid Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/scwtp/highzone_flow/current'
                  label='SCWTP High Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/scwtp/total_system_demand/current'
                  label='Total System Demand'
                />
              </div>
            </Paper>
          </Cell>
        </Grid>
        {/* <Grid>
          <Cell col={12}>
            <ChartDateTime url='/api/scada/scwtp/lowzone_flow/all' category="Timestamp" series="Value"/>
          </Cell>
        </Grid> */}
        {/* <Grid>
          <Cell col={12}>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 }
                ]}
              />
            </VictoryChart>
          </Cell>
        </Grid> */}
        <Grid>
          <Cell col={6}>
            <DataGridURL url='/api/scada/scwtp/recent/all'/>
          </Cell>
          <Cell col={6}>
            <DataGridURL url='/api/scada/hbwtp/recent/all'/>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={6}>
            <DataGridURL url='/api/scada/eldo/recent/all'/>
          </Cell>
          <Cell col={6}>
            <DataGridURL url='/api/scada/totals/recent/all'/>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={6}>
            <DataGridURL url='/api/scada/particles/recent/all'/>
          </Cell>
        </Grid>
      </DefaultLayout>
    )
  }
}

export { Scada };
