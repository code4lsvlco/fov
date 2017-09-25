import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
// import { connect } from 'react-redux';

// Javascripts
import 'react-metismenu/dist/react-metismenu.js'
import '../stylesheets/react-metismenu-inspinia.css';
import { SideBarMenuItems } from '.';

const SideBarHTML = (props) => (
  <nav className="navbar-default navbar-static-side">
    <div className="sidebar-collapse" style={{paddingTop: 30}}>
      <div>
        URL: <span>{props.location}</span>
      </div>
      <div className="clear">&nbsp;</div>
      <MetisMenu activeLinkFromLocation content={SideBarMenuItems}  LinkComponent={RouterLink}/>
    </div>
  </nav>
)

class SideBar extends Component {
  render() {
    // const { authenticated, location } = this.props;
    // console.log(this.props);
    // return this.props.authenticated ? <SideBarHTML location={location} /> : null
    return <SideBarHTML />
  }
}

const mapStatetoProps = (state) => {
  return { authenticated: state.authentication.authenticated }
}

// SideBar = connect(mapStatetoProps)(SideBar)
SideBar = withRouter(SideBar);
export { SideBar };
