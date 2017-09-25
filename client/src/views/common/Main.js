import React, { Component } from 'react';
import { Header, SideBar } from '.';
import { AppBar, Drawer, ListItem } from 'material-ui';
import { SelectableList } from '.';

class Main extends Component {
  render() {
    return (
      <div>
        <div id="page-wrapper" className="gray-bg" >
          <Header />
          <SideBar />
          { this.props.children }
        </div>
      </div>
    )
  }
}

export { Main };
