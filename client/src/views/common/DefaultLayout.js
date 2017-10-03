import React, { Component } from 'react';
import { Header, SideBar } from '.'

class DefaultLayout extends Component {
  render() {
    document.body.style.backgroundColor = '#2f4050';
    return (
      <div id="page-wrapper" className="gray-bg" >
        <Header />
        <SideBar />
        { this.props.children }
      </div>
    )
  }
}

export { DefaultLayout };
