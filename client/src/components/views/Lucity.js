import React, { Component } from 'react';
import axios from 'axios';

class Lucity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(`/api/lucity`)
      .then(res => {
        console.log(res)
        const data = [res.data] ;
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>
        <h1>Lucity</h1>
        <ul>
          {this.state.data.toString()}
        </ul>
      </div>
    );
  }
}

export { Lucity };
