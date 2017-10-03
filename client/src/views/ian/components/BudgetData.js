import React, { Component } from 'react';

import axios from 'axios';

import _ from 'lodash';
import accounting from 'accounting';

import BudgetDataForm from './BudgetDataForm';

import ReactDataGrid from 'react-data-grid';
import { PercentComplete } from '../../common/ReactDataGrid/Formatters/PercentComplete';
import { PercentCompleteYTD } from '../../common/ReactDataGrid/Formatters/PercentCompleteYTD';

// TODO - Add prop-types requirements.
class BudgetData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      originalRows: [],
      columns: [],
      orgFilter: [],
      objFilter: [],
      sortColumn: "",
      sortDirection: "NONE"
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
    this.handleObjChange = this.handleObjChange.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
  }

  fetchData(url) {
    axios.get(url, { headers: { authorization: localStorage.getItem('token') } })
      .then(res => {
        let data = res.data.recordset;
        const dataTransform = data.map((row) => {
          let spent = row.Revised_CY > 0 ? (row.MemoBalance_CY/row.Revised_CY * 100) : 100;
          spent = row.MemoBalance_CY == 0 ? 0 : spent;
          return {
            "Org Code": `${row.OrganizationCode} - ${row.SegmentFiveDescription}`,
            "Obj Code": `${row.ObjectCode} - ${row.LongDescription}`,
            "Original Budget": accounting.formatMoney(row.OriginalBudget_CY,"$",2),
            "Revised Budget": accounting.formatMoney(row.Revised_CY,"$",2),
            "Balance": accounting.formatMoney(row.MemoBalance_CY,"$",2),
            "Remaining":  accounting.formatMoney(row.Revised_CY-row.MemoBalance_CY,"$",2),
            "% Spent": accounting.toFixed(spent,2)
          }
        })
        data = dataTransform;
        const dataKeys = _.keys(data[0]);
        let columns = _.map(dataKeys,(key) => {return { key: key, name: key, sortable: true }});
        columns[0]["width"] = 275;
        columns[0]["type"] = "String";
        columns[1]["width"] = 275;
        columns[1]["type"] = "String";
        columns[2]["type"] = "Numeric";
        columns[3]["type"] = "Numeric";
        columns[4]["type"] = "Numeric";
        columns[5]["type"] = "Numeric";
        columns[6]["formatter"] = PercentCompleteYTD;
        columns[6]["type"] = "Numeric";
        this.setState({ columns: columns, rows: data, originalRows: data.slice(0) });
      })
      .catch(function (error) {
        console.log(error);
        // TODO - Handle this error in a productive way.
        // this.setState({ columns: [], rows: [] });
      });
  }

  componentDidMount() {
    this.fetchData(this.props.url);
  }

  handleOrgChange(values,object) {
    this.filterRows("org",values);
  }

  handleObjChange(values,object) {
    this.filterRows("obj",values);
  }

  handleGridSort(sortColumn, sortDirection,a,b) {
    this.filterRows("sort",{sortColumn: sortColumn, sortDirection: sortDirection})
  }

  filterRows(filter,values) {
    const orgFilter = filter == "org" ? values : this.state.orgFilter;
    const objFilter = filter == "obj" ? values : this.state.objFilter;
    const orgLength = orgFilter.length;
    const objLength = objFilter.length;
    const sortColumn = filter == "sort" ? values.sortColumn : this.state.sortColumn;
    const sortDirection = filter == "sort" ? values.sortDirection : this.state.sortDirection;

    let rows = this.state.originalRows.slice(0);

    if (orgLength > 0 && objLength == 0) {
      rows = _.filter(rows,(row) => {
        return orgFilter.indexOf(row["Org Code"]) > -1
      })
    }

    if (orgLength == 0 && objLength > 0) {
      rows = _.filter(rows,(row) => {
        return objFilter.indexOf(row["Obj Code"]) > -1
      })
    }

    if (orgLength > 0 && objLength > 0) {
      rows = _.filter(rows,(row) => {
        return orgFilter.indexOf(row["Org Code"]) > -1 && objFilter.indexOf(row["Obj Code"]) > -1
      })
    }

    if (sortDirection != "NONE") {
      const stringComparer = (a, b) => {
        if (sortDirection === 'ASC') return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        if (sortDirection === 'DESC') return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      };

      const numericComparer = (a, b) => {
        var pattern         = /[^0-9.-]+/g;
        if (sortDirection === 'ASC') return a[sortColumn].replace(pattern,'') - b[sortColumn].replace(pattern,'');
        if (sortDirection === 'DESC') return b[sortColumn].replace(pattern,'') - a[sortColumn].replace(pattern,'');
      }

      let column = _.find(this.state.columns, ['key', sortColumn]);
      if (column.type == "String") rows.sort(stringComparer);
      if (column.type == "Numeric") rows.sort(numericComparer);
    }

    this.setState({rows: rows, orgFilter: orgFilter, objFilter: objFilter, sortColumn: sortColumn, sortDirection: sortDirection});
  }

  render() {
    return (
      <div>
        <BudgetDataForm
          rows={this.state.rows}
          originalRows={this.state.originalRows}
          handleOrgChange={this.handleOrgChange}
          handleObjChange={this.handleObjChange}
        />
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          columns={this.state.columns}
          rowGetter={(index) => { return this.state.rows[index] }}
          rowsCount={ this.state.rows.length }
          minHeight={500}
        />
      </div>
    )
  }

};

export { BudgetData };
