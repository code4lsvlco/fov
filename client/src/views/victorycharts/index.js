import React, { Component } from 'react';
import { DefaultLayout } from '../common';
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
import { Paper } from 'material-ui';
import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data2015 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

const VictoryCharts = () => {
  return (
    <DefaultLayout>
      <Grid>
        <Cell col={12}>
          <Paper>
            <h1>Victory Charts</h1>
          </Paper>
        </Cell>
      </Grid>
      <Grid>
        <Cell col={3}>
          <Paper>
            <VictoryBar/>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryBar
              data={data}
              x='quarter'
              y='earnings'
            />
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryChart>
              <VictoryBar
                data={data}
                x='quarter'
                y='earnings'
              />
            </VictoryChart>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryChart
              domainPadding={20}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryBar
                data={data}
                x='quarter'
                y='earnings'
              />
            </VictoryChart>
          </Paper>
        </Cell>
      </Grid>
      <Grid>
        <Cell col={3}>
          <Paper>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryBar
                data={data}
                x='quarter'
                y='earnings'
              />
            </VictoryChart>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryStack>
                <VictoryBar
                  data={data2012}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2013}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2014}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2015}
                  x="quarter"
                  y="earnings"
                />
              </VictoryStack>
            </VictoryChart>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryStack
                colorScale={'warm'}
              >
                <VictoryBar
                  data={data2012}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2013}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2014}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2015}
                  x="quarter"
                  y="earnings"
                />
              </VictoryStack>
            </VictoryChart>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryGroup
                colorScale={'qualitative'}
                offset={9}
              >
                <VictoryBar
                  data={data2012}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2013}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2014}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2015}
                  x="quarter"
                  y="earnings"
                />
              </VictoryGroup>
            </VictoryChart>
          </Paper>
        </Cell>
      </Grid>
      <Grid>
        <Cell col={6}>
          <Paper>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              containerComponent={
                <VictoryVoronoiContainer voronoiDimension="x"
                  labels={(d) => `series: ${d.y}`}
                  labelComponent={<VictoryTooltip cornerRadius={3} flyoutStyle={{fill: "white"}}/>}
                />
              }
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryGroup
                colorScale={'qualitative'}
                offset={9}
              >
                <VictoryBar
                  // labels={(d) => d.y}
                  // labelComponent={<VictoryTooltip/>}
                  data={data2012}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2013}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2014}
                  x="quarter"
                  y="earnings"
                />
                <VictoryBar
                  data={data2015}
                  x="quarter"
                  y="earnings"
                />
              </VictoryGroup>
              <VictoryLegend x={0} y={0}
                title="Legend"
                centerTitle
                orientation="horizontal"
                gutter={10}
                // style={{ border: { stroke: "black" }, title: {fontSize: 10 } }}
                colorScale={'qualitative'}
                data={[
                  { name: "2012" },
                  { name: "2013" },
                  { name: "2014" },
                  { name: "2015" },
                ]}
              />
            </VictoryChart>
          </Paper>
        </Cell>
      </Grid>
      <Grid>
        <Cell col={3}>
          <Paper>
            <VictoryScatter/>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryArea/>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryCandlestick/>
          </Paper>
        </Cell>
        <Cell col={3}>
          <Paper>
            <VictoryLine/>
          </Paper>
        </Cell>
      </Grid>
      <Grid>
        <Cell col={3}>
          <Paper>
            <VictoryPie/>
          </Paper>
        </Cell>
      </Grid>
    </DefaultLayout>
  )
}

export { VictoryCharts };
