import React, { Component } from 'react';
import { BudgetData } from './BudgetData';

class BudgetBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <BudgetData
        url={ this.props.url }
      />
    )
  }
}

export { BudgetBox };
