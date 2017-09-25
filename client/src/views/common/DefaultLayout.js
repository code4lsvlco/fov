import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Main, SideBar } from '.'

class DefaultLayout extends Component {
  render() {
    document.body.style.backgroundColor = '#2f4050';
    return (
      <div>
        {/* <SideBar/> */}
        <Main>
          { this.props.children }
        </Main>
      </div>
    )
  }
}

DefaultLayout = withRouter(DefaultLayout);
export { DefaultLayout };
