import React, { Component } from 'react';
import { Grid, Cell } from 'material-grid';
import { Paper } from 'material-ui';
import { Statistic } from 'semantic-ui-react';
import { StatisticURL } from './components/StatisticURL';
import { DefaultLayout, ChartDateTime, DataGridURL } from '../common';
// import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryGroup,
  VictoryTooltip,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryBar,
  VictoryArea,
  VictoryCandlestick,
  VictoryLine,
  VictoryScatter,
  VictoryPie } from 'victory'
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import 'semantic-ui-css/semantic.min.css';

import simplify from 'simplify-js'



class Scada extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   raw: {
    //     eldorado: {},
    //     ncwcd: {},
    //   },
    //   treatment: {
    //     scwtp: {
    //       flowEffluent: 0
    //     },
    //     hbwtp: {},
    //   },
    //   distribution: {
    //     low: {},
    //     mid: {},
    //     high: {}
    //   },
    // };
    this.state = {
      scwtpFlowData: [],
      highZoneFlowData: [],
      midZoneFlowData: [],
      lowZoneFlowData: [],
      highZoneTankData: [],
      midZoneTankData: [],
      lowZoneTankData: []
    }
  }

  componentDidMount() {
    axios.get('/api/scada/mongo/totals/north_plant_flow_pd/all')
      .then(res => {
        // console.log(res);
        // console.log(res.data.recordset);
        // var timeStamp = Math.floor(Date() / 1000);
        let data = res.data.recordset ;
        // console.log(data);
        let modData = [];
        let groupedData = undefined;
        groupedData = _.groupBy(data,function(d) {
          return moment(d.Timestamp).local().format("YYYY-MM-DD");
        });
        groupedData = _.each(groupedData,function(d){
          d = _.sortBy(d,"Timestamp");
          modData.push({x: moment(d[0].Timestamp).utc().format(), y: parseFloat(d[0].Value)})
        });
        modData = _.sortBy(modData, "x");
        this.setState({ scwtpFlowData: modData })
        // console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/highzone_flow/all')
      .then(res => {
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,4);
        console.log("After Simplify: " + modData2.length)
        this.setState({ highZoneFlowData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/midzone_flow/all')
      .then(res => {
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,4);
        console.log("After Simplify: " + modData2.length)
        this.setState({ midZoneFlowData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/lowzone_flow/all')
      .then(res => {
        console.log(res)
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,4);
        console.log("After Simplify: " + modData2.length)
        this.setState({ lowZoneFlowData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/2mg_tank_level_ft/all')
      .then(res => {
        console.log(res)
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,.5);
        console.log("After Simplify: " + modData2.length)
        this.setState({ highZoneTankData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/3mg_tank_level_ft/all')
      .then(res => {
        console.log(res)
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,.5);
        console.log("After Simplify: " + modData2.length)
        this.setState({ lowZoneTankData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('/api/scada/mongo/scwtp/s35mg_tank_level/all')
      .then(res => {
        console.log(res)
        let data = res.data.recordset ;
        let modData2 = [];
        _.each(data,function(d){
          modData2.push({x: parseFloat(moment(d.Timestamp).utc().format("X")), y: parseFloat(d.Value)})
        });
        // modData2 = _.sortBy(modData2,"x")
        console.log(modData2[0]);
        console.log("Before Simplify: " + modData2.length);
        modData2 = simplify(modData2,.5);
        console.log("After Simplify: " + modData2.length)
        this.setState({ midZoneTankData: modData2 })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <DefaultLayout>
        <Grid>
          <Cell col={3}>
            <Paper>
              <VictoryChart
                height={240}
                domainPadding={20}
                theme={VictoryTheme.material}
                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={(d) => `${moment(d.x).format("MM-DD")},${(d.y).toFixed(2)}`}
                    labelComponent={<VictoryTooltip cornerRadius={3} flyoutStyle={{fill: "white"}}/>}
                  />
                }
              >
                <VictoryAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${moment(x).local().format("DD")}`)}
                  label="Date"
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${parseFloat(x).toFixed(2)}`)}
                  label="MGD"
                />
                <VictoryLine
                  data={this.state.scwtpFlowData}
                  x='x'
                  y='y'
                />
                </VictoryChart>
            </Paper>
          </Cell>
        </Grid>
        <Grid>
          {/* Tank Levels */}
          <Cell col={3} >
            <Paper>
              <VictoryChart
                height={240}
                domainPadding={20}
                theme={VictoryTheme.material}
                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={(d) => `${moment(d.x * 1000).local().format()},${(d.y).toFixed(2)}`}
                    labelComponent={<VictoryTooltip cornerRadius={3} flyoutStyle={{fill: "white"}}/>}
                  />
                }
              >
                <VictoryAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${moment(x*1000).local().format("DD")}`)}
                  // tickFormat={(x) => (`${x}`)}
                  // label="Date"
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${x}`)}
                  label="FT"
                />
                <VictoryGroup colorScale={'qualitative'}>
                  <VictoryLine data={this.state.highZoneTankData} />
                  <VictoryLine data={this.state.midZoneTankData} />
                  <VictoryLine data={this.state.lowZoneTankData} />
                </VictoryGroup>
                <VictoryLegend x={0} y={0}
                  title="Legend"
                  centerTitle
                  orientation="horizontal"
                  gutter={10}
                  // style={{ border: { stroke: "black" }, title: {fontSize: 10 } }}
                  colorScale={'qualitative'}
                  data={[
                    { name: "HZ" },
                    { name: "MZ" },
                    { name: "LZ" },
                  ]}
                />
              </VictoryChart>
            </Paper>
          </Cell>
          {/* Zone Flows */}
          <Cell col={3} >
            <Paper>
              <VictoryChart
                height={240}
                domainPadding={20}
                theme={VictoryTheme.material}
                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={(d) => `${moment(d.x * 1000).local().format()},${(d.y).toFixed(2)}`}
                    labelComponent={<VictoryTooltip cornerRadius={3} flyoutStyle={{fill: "white"}}/>}
                  />
                }
              >
                <VictoryAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${moment(x*1000).local().format("DD")}`)}
                  // tickFormat={(x) => (`${x}`)}
                  //label="Date"
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`${x}`)}
                  //label="MGD"
                />
                <VictoryGroup colorScale={'qualitative'}>
                  <VictoryLine data={this.state.highZoneFlowData} />
                  <VictoryLine data={this.state.midZoneFlowData} />
                  <VictoryLine data={this.state.lowZoneFlowData} />
                </VictoryGroup>
              </VictoryChart>
            </Paper>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/mssql/scwtp/lowzone_flow/current'
                  label='SCWTP Low Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/mssql/scwtp/midzone_flow/current'
                  label='SCWTP Mid Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/mssql/scwtp/highzone_flow/current'
                  label='SCWTP High Zone Flow'
                />
              </div>
            </Paper>
          </Cell>
          <Cell col={3}>
            <Paper>
              <div style={{padding: 50, textAlign: 'center'}}>
                <StatisticURL
                  url='/api/scada/mssql/scwtp/total_system_demand/current'
                  label='Total System Demand'
                />
              </div>
            </Paper>
          </Cell>
        </Grid>
        {/* <Grid>
          <Cell col={12}>
            <ChartDateTime url='/api/scada/mssql/scwtp/lowzone_flow/all' category="Timestamp" series="Value"/>
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
            <DataGridURL url='/api/scada/mssql/scwtp/recent/all'/>
          </Cell>
          <Cell col={6}>
            <DataGridURL url='/api/scada/mssql/hbwtp/recent/all'/>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={6}>
            <DataGridURL url='/api/scada/mssql/eldo/recent/all'/>
          </Cell>
          <Cell col={6}>
            <DataGridURL url='/api/scada/mssql/totals/recent/all'/>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={6}>
            <DataGridURL url='/api/scada/mssql/particles/recent/all'/>
          </Cell>
        </Grid>
      </DefaultLayout>
    )
  }
}

export { Scada };
