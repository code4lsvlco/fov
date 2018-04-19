import React, { Component } from 'react';
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
import { Toolbar, ToolbarGroup, ToolbarTitle, FontIcon, IconButton } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { DialogModal } from '../../../common';

// TODO - Add prop-types requirements.
class UsersMuiTableURL extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
      selectedRow: null,
    };

    this._onCellClick = this._onCellClick.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);
    this._onDeleteUserClick = this._onDeleteUserClick.bind(this);
    this._onInviteUserClick = this._onInviteUserClick.bind(this);
    this._onChangePasswordUserClick = this._onChangePasswordUserClick.bind(this);
    this._onForgotPasswordUserClick = this._onForgotPasswordUserClick.bind(this);
  }

  _fetchData(url) {
    axios.get(url, { headers: { authorization: localStorage.getItem('token') } })
      .then(res => {
        const data = res.data;
        const dataKeys = _.keys(data[0]);
        const dataKeyName = _.map(dataKeys,(key) => {return { key: key, name: key }});
        this.setState({ columns: dataKeyName, rows: data });
      })
      .catch(function (error) {
        console.log(error);
        // TODO - Handle this error in a productive way.
        // this.setState({ columns: [], rows: [] });
      });
  }

  componentDidMount() {
    this._fetchData(this.props.url);
  }

  _onRowSelection(rows) {
    console.log('_onRowSelection');
    console.log(rows);
    console.log(rows.length);
    if (rows.length == 0) this.setState({selectedRow: null});
    if (rows.length == 1) this.setState({selectedRow: rows[0]});
  }

  _onCellClick(rowNumber, columnNumber, evt) {
    // Do Something
    console.log('_onCellClick');
  }

  _onDeleteUserClick(e){
    const selectedRow = this.state.selectedRow;
    const idKey = this.props.idKey;
    const objectID = this.state.rows[selectedRow][idKey];
    axios.delete(this.props.url, { headers: { authorization: localStorage.getItem('token') }, data: {id: objectID} })
      .then(res => {
        this.setState({selectedRow: null});
        this._fetchData(this.props.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _onInviteUserClick() {
    console.log("_onInviteUserClick");
    this.setState({showDialogModal: true});
  };

  _onChangePasswordUserClick() {
    console.log("_onChangePasswordUserClick");
    this.setState({showDialogModal: true});
  };

  _onForgotPasswordUserClick() {
    console.log("_onForgotPasswordUserClick");
    this.setState({showDialogModal: true});
  };

  render() {
    const columnKeys = this.state.columns.map((column) => { return column.key });
    _.pullAll(columnKeys, this.props.omitKeys);

    const selectedRow = this.state.selectedRow;
    console.log(this.state.showDialogModal)

    return (
      <div>
        <Toolbar style={{ backgroundColor: '#fff' }}>
          <div style={{ float: 'left' }}>
            <ToolbarGroup>
              <ToolbarTitle text="Users" />
            </ToolbarGroup>
          </div>

            <div style={{ float: 'right' }}>
              <ToolbarGroup>
                { selectedRow !== null ?
                  <div>
                    <IconButton>
                      <DialogModal
                        title="Delete User"
                        submit={this._onDeleteUserClick}
                        submitLabel="Delete User"
                        button={<ActionDelete />}
                      >
                        Are you sure you want to delete this user?
                      </DialogModal>
                    </IconButton>
                    <IconButton onClick={this._onChangePasswordClick} >
                      <DialogModal title="Change User Password" button={<ActionLock />}>
                        TODO: Create ChangePasswordForm
                      </DialogModal>
                    </IconButton>
                    <IconButton onClick={this._onForgotPasswordClick} >
                      <DialogModal title="Send Forgot Password" button={<ActionLockOpen />}>
                        TODO: Send Forgot Password
                      </DialogModal>
                    </IconButton>
                  </div>
                :
                  <IconButton>
                    <DialogModal title="Invite User" onClick={this._onInviteUserClick} button={<ContentAdd />}>
                      InviteUserForm
                    </DialogModal>
                  </IconButton>
                }
              </ToolbarGroup>
            </div>

        </Toolbar>
        <Table onRowSelection={this._onRowSelection} onCellClick={this._onCellClick}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {columnKeys.map(function(title){
                return <TableHeaderColumn>{ title }</TableHeaderColumn>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true} showRowHover={true} deselectOnClickaway={false}>
            {this.state.rows.map(function(row,index){
              return (
                <TableRow selected={selectedRow == index ? true : false}>
                  {columnKeys.map(function(key){
                    return <TableRowColumn>{ row[key].toString() }</TableRowColumn>
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

export { UsersMuiTableURL };
