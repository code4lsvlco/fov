import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import _ from 'lodash';

class ChartRowBar extends Component {
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
    axios.get(this.props.url)
      .then(res => {
        // console.log(res.data.recordset);
        const data = res.data.recordset ;
        const dataKeys = _.keys(data[0]);
        const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key }});
        const categories = _.map(data,(row) => {return row[this.props.category]});
        const series = _.map(data,(row) => {return row[this.props.series]});
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
    return (
      <ReactHighcharts config={
        {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: this.state.categories,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    // overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'top',
            //     x: -40,
            //     y: 80,
            //     floating: true,
            //     borderWidth: 1,
            //     backgroundColor: ('#FFFFFF'),
            //     shadow: true
            // },
            series: [{
                // name: 'Year 1800',
                data: this.state.series
            }]
        }
      }></ReactHighcharts>
    )
  }
}

export { ChartRowBar };
