import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Statistic } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import 'semantic-ui-css/semantic.min.css';

class StatisticURL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      timestamp: 0
    };

  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(res => {
        let data = res.data.recordset[0];
        console.log(data);
        // const dataKeys = _.keys(data[0]);
        // const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key }});
        this.setState({ value: data.Value.toFixed(this.props.fixed ? this.props.fixed : 0), timestamp: data.Timestamp });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Statistic size="large">
        <Statistic.Value>{this.state.value}</Statistic.Value>
        <Statistic.Label>{this.props.label}</Statistic.Label>
        <Statistic.Label>
          <span
            style={{
              fontWeight: 'normal',
              fontSize: 12,
              color: '#DDD'
            }}
          >
            {moment(this.state.timestamp).fromNow()}
          </span>
        </Statistic.Label>
      </Statistic>
    )
  }

};

export { StatisticURL };
