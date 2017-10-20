import React, { Component } from 'react';
import axios from 'axios';

import { Paper } from 'material-ui';

import { Grid, Cell } from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

import CalendarHeatmap from 'react-calendar-heatmap';
import './components/react-calendar-heatmap.css';

import {ReactHintFactory} from 'react-hint'
import 'react-hint/css/index.css'

import { DefaultLayout } from '../common';

const ReactHint = ReactHintFactory(React);

class FleetShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripDateTimeFrequency: []
    };
  }

  componentDidMount() {
    axios.get(`/api/fleet/${this.props.match.params.objectID}/tripdata/groupby/reportdatetime`, { headers: { authorization: localStorage.getItem('token') } })
      .then(res => {
        let data = res.data;
        console.log(data);
        data = data.map((trip) => { return { date: trip.date.split("T")[0], count: trip.count }})
        // const dataKeys = Object.keys(data[0]);
        // const columns = dataKeys.map((key) => {return { key: key, name: key }});
        this.setState({ tripDateTimeFrequency: data });
      })
      .catch(function (error) {
        console.log(error);
        // TODO - Handle this error in a productive way.
        // this.setState({ columns: [], rows: [] });
      });
  }

  customOnClick(value) {
    console.log(value);
    // if (value) {
    //   alert(`Clicked on ${value.date.toDateString()} with value ${value.count}`);
    // }
  }

  // customTooltipDataAttrs(values) {
  //   console.log(values);
  //   return { 'data-rh': "Left", 'data-rh-at': "left" }
  // };
  // customTooltipDataAttrs = { 'data-rh': "Left", 'data-rh-at': "left" };
  // customTooltipDataAttrs = { 'data-toggle': 'tooltip' };
  // customTooltipDataAttrs = { 'class': 'hint--top', 'aria-label': 'Thank you!' };



  render() {
    return (
      <DefaultLayout>
        <Grid>
          <Cell col={12}>
            <Paper>
              <ReactHint events delay={100} />
              <div style={{paddingRight: 50, paddingLeft: 50, paddingTop: 50, paddingBottom: 0}}>
                <h1>2015</h1>
                <CalendarHeatmap
                  showWeekdayLabels={true}
                  startDate={new Date('2015-01-01')}
                  endDate={new Date('2015-12-31')}
                  values={this.state.tripDateTimeFrequency}
                  onClick={this.customOnClick}
                  tooltipDataAttrs={(value) => ({ 'data-rh': `${value.date} - ${value.count}`, 'data-rh-at': "left" })}
                />
              </div>
              <div style={{paddingRight: 50, paddingLeft: 50, paddingTop: 0, paddingBottom: 0}}>
                <h1>2016</h1>
                <CalendarHeatmap
                  showWeekdayLabels={true}
                  startDate={new Date('2016-01-01')}
                  endDate={new Date('2016-12-31')}
                  values={this.state.tripDateTimeFrequency}
                  onClick={this.customOnClick}
                />
              </div>
              <div style={{paddingRight: 50, paddingLeft: 50, paddingTop: 0, paddingBottom: 0}}>
                <h1>2017</h1>
                <CalendarHeatmap
                  showWeekdayLabels={true}
                  startDate={new Date('2017-01-01')}
                  endDate={new Date('2017-12-31')}
                  values={this.state.tripDateTimeFrequency}
                  onClick={this.customOnClick}
                />
              </div>
            </Paper>
          </Cell>
        </Grid>
      </DefaultLayout>
    )
  }
}

export { FleetShow };
