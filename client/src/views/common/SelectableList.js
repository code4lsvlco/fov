import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Link, NavLink, withRouter } from 'react-router-dom';
// import Avatar from 'material-ui/Avatar';
// import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.match.path,
      });
    }

    handleRequestChange = (event, index) => {
      if (!index) return;
      this.props.history.push(index)
      console.log(index);
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);
SelectableList = withRouter(SelectableList);

export { SelectableList };
