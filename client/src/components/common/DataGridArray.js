import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import _ from 'lodash';

const DataGridArray = (props) => {

  const rows = props.data;
  const dataKeys = _.keys(props.data[0]);
  const columns = _.map(dataKeys,(key) => {return { key: key, name: key, width: 200 }});
  // console.log(dataKeyName);
  // this.setState({ data: data, rows: data, columns: dataKeyName });

  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => {return rows[i];}}
        rowsCount={rows.length}
        minHeight={500}
      />
    </div>
  )

};

export { DataGridArray };
