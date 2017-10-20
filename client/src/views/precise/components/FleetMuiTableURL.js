import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TablePagination
} from 'material-ui/Table'
// import { Toolbar, ToolbarGroup, ToolbarTitle, FontIcon, IconButton } from 'material-ui';

class FleetMuiTableURL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
      selectedRow: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    // this.onRowSelection = this.onRowSelection.bind(this);
  }

  fetchData(url) {
    axios.get(url, { headers: { authorization: localStorage.getItem('token') } })
      .then(res => {
        let data = res.data;
        const dataKeys = _.keys(data[0]);
        const columns = _.map(dataKeys,(key) => {return { key: key, name: key }});
        this.setState({ columns: columns, rows: data });
      })
      .catch(function (error) {
        this.setState({ columns: ["Error"], rows: [{Error: error}] })
        // console.log(error);
        // TODO - Handle this error in a productive way.
        // this.setState({ columns: [], rows: [] });
      });
  }

  componentDidMount() {
    this.fetchData(this.props.url);
  }

  // onRowSelection(rows) {
  //   console.log('onRowSelection');
  //   console.log(rows);
  //   console.log(rows.length);
  //   if (rows.length == 0) this.setState({selectedRow: null});
  //   if (rows.length == 1) this.setState({selectedRow: rows[0]});
  // }

  onCellClick(rowNumber, columnNumber, evt) {
    // Do Something
    console.log(this);
    console.log(this.state.rows[rowNumber]);
    this.props.history.push(`/precise/fleet/${this.state.rows[rowNumber]._id}`)
  }

  render() {
    const columnKeys = this.state.columns.map((column) => { return column.key });
    _.pullAll(columnKeys, this.props.omitKeys);
    // console.log(columnKeys);
    const selectedRow = this.state.selectedRow;

    return (
      <div>
        {/* <Toolbar style={{ backgroundColor: '#fff' }}>
          <div style={{ float: 'left' }}>
            <ToolbarGroup>
              <ToolbarTitle text={this.props.title} />
            </ToolbarGroup>
          </div>
          <div style={{ float: 'right' }}>
            <ToolbarGroup>
              { selectedRow !== null ?
                <IconButton onClick={this._onDeleteClick} >
                  <ActionDelete />
                </IconButton>
              :
                ""
              }
            </ToolbarGroup>
          </div>
        </Toolbar> */}
        <Table onCellClick={this.onCellClick}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {columnKeys.map(function(heading){
                return <TableHeaderColumn>{ heading }</TableHeaderColumn>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true} deselectOnClickaway={false}>
            {this.state.rows.map(function(row,index){
              return (
                <TableRow selected={selectedRow == index ? true : false}>
                  {columnKeys.map(function(key){
                    return <TableRowColumn>{ row[key] ? row[key].toString() : "" }</TableRowColumn>
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

    )
  }

};
FleetMuiTableURL = withRouter(FleetMuiTableURL);
export { FleetMuiTableURL };
