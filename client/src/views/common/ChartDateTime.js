import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

class ChartDateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
      categories: [],
      series: []
    };

  }

  componentDidMount() {
    console.log("ChartDateTime componentDidMount");
    axios.get(this.props.url)
      .then(res => {
        // console.log(res);
        // console.log(res.data.recordset);
        // var timeStamp = Math.floor(Date() / 1000);
        let data = res.data.recordset ;
        // console.log(data);
        data = _.sortBy(data, this.props.category);
        data = _.dropRight(data);
        const dataKeys = _.keys(data[0]);
        const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key }});
        const categories = _.map(data,(row) => {return row[this.props.category]});
        const series = _.map(data,(row) => {
          let datetime = moment(row[this.props.category])
          let year = datetime.year();
          let month = datetime.month();
          let day = datetime.date();
          return [Date.UTC(year,month,day),row[this.props.series]]
        });
        this.setState({ columns: dataKeyName, rows: data, categories: categories, series: series });
        // console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Title
  // Subtitle
  // yaxis

  render() {
    console.log("ChartDateTime render");
    return (
      <ReactHighcharts config={
        {
              chart: {
                  zoomType: 'x'
              },
              title: {
                  text: ''
              },
              subtitle: {
                  text: document.ontouchstart === undefined ?
                          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
              },
              xAxis: {
                  type: 'datetime'
              },
              yAxis: {
                  title: {
                      text: ''
                  }
              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  area: {
                      // fillColor: {
                      //     linearGradient: {
                      //         x1: 0,
                      //         y1: 0,
                      //         x2: 0,
                      //         y2: 1
                      //     }
                      // },
                      marker: {
                          radius: 2
                      },
                      lineWidth: 1,
                      states: {
                          hover: {
                              lineWidth: 1
                          }
                      },
                      threshold: null
                  }
              },

              series: [{
                  type: 'area',
                  name: 'Time Series',
                  data: this.state.series
              }]
        }
      }></ReactHighcharts>
    )
  }
}

export { ChartDateTime };
