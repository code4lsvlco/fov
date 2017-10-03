import React from 'react';
import { Paper } from 'material-ui';
import { DefaultLayout } from '../common';
import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

class GridView extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="wrapper wrapper-content">
          <Grid>
            <Cell col={12}><Paper>12</Paper></Cell>
          </Grid>
          <Grid>
            <Cell col={4} tablet={2} ><Paper>4-2</Paper></Cell>
            <Cell col={8} tablet={6} ><Paper>8-6</Paper></Cell>
          </Grid>
          <Grid>
            <Cell col={1} tablet={8} phone={4}><Paper>1-8-4</Paper></Cell>
            <Cell col={1} tablet={8} phone={4}><Paper>1-8-4</Paper></Cell>
            <Cell col={1} tablet={4} phone={4}><Paper>1-8-4</Paper></Cell>
            <Cell col={1} tablet={4} phone={4}><Paper>1-8-4</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
            <Cell col={1}><Paper>1</Paper></Cell>
          </Grid>
        </div>
      </DefaultLayout>
    )
  }
}

export { GridView };
