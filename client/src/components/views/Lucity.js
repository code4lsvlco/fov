import React, { Component } from 'react';
import { Row, Ibox, DataGridArray, DataGridURL } from '../common';
import axios from 'axios';
import _ from 'lodash';

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

  render() {
    return (
      <div className="wrapper wrapper-content">
        <Row>
          <Ibox width="6" title="Grouped By WO_CAT_TY WO_PROB_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_CAT_TY/WO_PROB_TY'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_PROB_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_PROB_TY'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_ACTN_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_ACTN_TY'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_PROB_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_STAT_TY'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_USER1TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_USER1TY'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_PRIORTY">
            <DataGridURL url='/api/lucity/work/groupby/WO_PRIORTY'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_STRT_DT">
            <DataGridURL url='/api/lucity/work/groupby/WO_STRT_DT'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_END_DT">
            <DataGridURL url='/api/lucity/work/groupby/WO_END_DT'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_DEPT_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_DEPT_TY'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_DIV_TY">
            <DataGridURL url='/api/lucity/work/groupby/WO_DIV_TY'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_USER16T">
            <DataGridURL url='/api/lucity/work/groupby/WO_USER16T'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_OPN_FLG">
            <DataGridURL url='/api/lucity/work/groupby/WO_OPN_FLG'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_ADESC1">
            <DataGridURL url='/api/lucity/work/groupby/WO_ADESC1'/>
          </Ibox>
          <Ibox width="6" title="Grouped By WO_ADESC2">
            <DataGridURL url='/api/lucity/work/groupby/WO_ADESC2'/>
          </Ibox>
        </Row>
        <Row>
          <Ibox width="6" title="Grouped By WO_CRT_BY">
            <DataGridURL url='/api/lucity/work/groupby/WO_CRT_BY'/>
          </Ibox>
          <Ibox width="6" title="Grouped By RQ_STAT_TY">
            <DataGridURL url='/api/lucity/request/groupby/RQ_STAT_TY'/>
          </Ibox>
        </Row>
      </div>
    );
  }
}

export { Lucity };
