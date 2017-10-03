import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import _ from 'lodash';

class DataGridURL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: []
    };

  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(res => {
        let data = res.data.recordset ;
        const dataKeys = _.keys(data[0]);
        const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key }});
        this.setState({ columns: dataKeyName, rows: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={(i) => {return this.state.rows[i];}}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
      </div>
    )
  }

};

export { DataGridURL };
