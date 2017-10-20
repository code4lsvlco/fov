import React, { Component } from 'react';
import { Card, CardHeader, CardActions, CardText, FlatButton } from 'material-ui'

import axios from 'axios';
import _ from 'lodash';

import { DefaultLayout } from '../common'
import { FleetMuiTableURL } from './components/FleetMuiTableURL';

import {Grid, Cell} from 'material-grid/dist';
import 'material-grid/dist/css/material-grid.css';

class Fleet2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
    };

    this.fetchData = this.fetchData.bind(this);
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
        // console.log(error);
        // TODO - Handle this error in a productive way.
        // this.setState({ columns: [], rows: [] });
      });
  }

  componentDidMount() {
    this.fetchData("/api/fleet");
  }

  render() {
    return (
      <div>
        <DefaultLayout>
          {/* <Grid> */}
            {/* <Cell col={12}> */}
              { this.state.rows.map((vehicle) => {
                return (
                  <Card zIndex={1}>
                    <CardHeader
                      title="Without Avatar"
                      subtitle="Subtitle"
                      actAsExpander={true}
                      showExpandableButton={true}
                       zIndex={1}
                    />
                    <CardText expandable={true} zIndex={1}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                  </Card>
                )
              })}

            {/* </Cell> */}
          {/* </Grid> */}

        </DefaultLayout>
      </div>
    )
  }
}

export { Fleet2 };
