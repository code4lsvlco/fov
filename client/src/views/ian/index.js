import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DefaultLayout, DataGridURL, Row, CardBox } from '../common'
import { BudgetData } from './components/BudgetData';
import { Paper } from 'material-ui';

import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

class Ian extends Component {

  getSubURL = (pathname) => {
    return pathname.indexOf("expenses") > -1 ? 'expenses' : 'revenues'
  }

  constructor(props) {
    super(props);
    // const subURL = ;
    console.log("constructor");
    console.log(props.path);
    this.state = {
      // subURL: this.getSubURL(props.path)
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    // this.setState({subURL: this.getSubURL(this.props.location.pathname)});
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    // console.log("currentProps");
    // console.log(this.props.location.pathname);
    // console.log("nextProps");
    // console.log(nextProps.location.pathname);
    // console.log("currentState");
    // console.log(this.state);
    // console.log("nextState");
    // console.log(nextState);
    // this.setState({subURL: this.getSubURL(nextProps.location.pathname)})
    // return true
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.state);
    console.log("componentWillReceiveProps");
    console.log(`current subURL: ${this.state.subURL}`);
    // console.log(this.props.location.pathname);
    // console.log("nextProps");
    // console.log(nextProps.location.pathname);
    console.log(`next subURL: ${this.getSubURL(nextProps.location.pathname)}`);
    // this.setState({subURL: this.getSubURL(nextProps.location.pathname)})
    console.log(this);
  }

  render () {
    // console.log(`Pathname: ${this.props.location.pathname}, state.subURL: ${this.state.subURL}`);
    return (
      <div>
        <DefaultLayout>
          <Grid>
            <Cell col={12}>
              <Paper>
                {this.state.subURL}
                <br/>
                {window.location.pathname}
                <BudgetData
                  url={`/api/ian/munis/budget/${this.getSubURL(this.props.location.pathname)}`}
                />
              </Paper>
            </Cell>
          </Grid>
        </DefaultLayout>
      </div>
    )
  }
}

Ian = withRouter(Ian);
export { Ian };
