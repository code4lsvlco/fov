import React, { Component } from 'react';
import { DefaultLayout, Row, CardBox, DataGridArray, DataGridURL, ChartRowBar } from '../common';
// import { DefaultLayout } from '../common'
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import _ from 'lodash';
import { Card, CardHeader } from 'material-ui';

const configLine = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  title: null,
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};

const configPie = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: null,
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    }

const configRowBar = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ('#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2012',
        data: [1052, 954, 4250, 740, 38]
    }]
};

class Lucity extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     data: [],
  //     rows: [],
  //     columns: [],
  //   };
  // }

  // componentDidMount() {
  //   axios.get(`/api/lucity/work/groupby/WO_CAT_TY`)
  //     // .then(res => {
  //     //   const data = res.data.recordset ;
  //     //   this.setState({ data });
  //     // });
  //   .then(res => {
  //     const data = res.data.recordset ;
  //     const dataKeys = _.keys(data[0]);
  //     const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key, width: 200 }});
  //     // console.log(dataKeyName);
  //     this.setState({ data: data, rows: data, columns: dataKeyName });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // const config = {
  //   /* HighchartsConfig */
  // };

  render() {
    return (
      <DefaultLayout>
        <div className="wrapper wrapper-content">
          <Row>
            <CardBox width="12" title="Example #1">
              <DataGridURL url='/api/lucity/work/status/open'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Example #1">
              <ChartRowBar url='/api/lucity/work/groupby/WO_CAT_TY' category="WO_CAT_TY" series="count"/>
            </CardBox>
            <CardBox width="6" title="Highcharts Pie Chart with Legend">
              <ChartRowBar url='/api/lucity/work/groupby/WO_PROB_TY' category="WO_PROB_TY" series="count"/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Highcharts Pie Chart">
              <ChartRowBar url='/api/lucity/work/groupby/WO_ACTN_TY' category="WO_ACTN_TY" series="count"/>
            </CardBox>
            <CardBox width="6" title="Highcharts Pie Chart with Legend">
              <ChartRowBar url='/api/lucity/work/example/1' category="WO_ACTN_TY" series="sum"/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_CAT_TY WO_PROB_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_CAT_TY/WO_PROB_TY'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_PROB_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_PROB_TY'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_ACTN_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_ACTN_TY'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_STAT_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_STAT_TY'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_USER1TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_USER1TY'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_PRIORTY">
              <DataGridURL url='/api/lucity/work/groupby/WO_PRIORTY'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_STRT_DT">
              <DataGridURL url='/api/lucity/work/groupby/WO_STRT_DT'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_END_DT">
              <DataGridURL url='/api/lucity/work/groupby/WO_END_DT'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_DEPT_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_DEPT_TY'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_DIV_TY">
              <DataGridURL url='/api/lucity/work/groupby/WO_DIV_TY'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_USER16T">
              <DataGridURL url='/api/lucity/work/groupby/WO_USER16T'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_OPN_FLG">
              <DataGridURL url='/api/lucity/work/groupby/WO_OPN_FLG'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_ADESC1">
              <DataGridURL url='/api/lucity/work/groupby/WO_ADESC1'/>
            </CardBox>
            <CardBox width="6" title="Grouped By WO_ADESC2">
              <DataGridURL url='/api/lucity/work/groupby/WO_ADESC2'/>
            </CardBox>
          </Row>
          <Row>
            <CardBox width="6" title="Grouped By WO_CRT_BY">
              <DataGridURL url='/api/lucity/work/groupby/WO_CRT_BY'/>
            </CardBox>
            <CardBox width="6" title="Grouped By RQ_STAT_TY">
              <DataGridURL url='/api/lucity/request/groupby/RQ_STAT_TY'/>
            </CardBox>
          </Row>
        </div>
      </DefaultLayout>
    );
  }
}

export { Lucity };
