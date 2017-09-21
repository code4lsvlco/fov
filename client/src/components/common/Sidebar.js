import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import { connect } from 'react-redux';

// Javascripts
import 'react-metismenu/dist/react-metismenu.js'
import '../stylesheets/react-metismenu-inspinia.css';
import { SideBarMenuItems } from '.';

const SideBarHTML = () => (
  <nav className="navbar-default navbar-static-side">
    <div className="sidebar-collapse" style={{paddingTop: 30}}>
      <div>
      </div>
      <MetisMenu activeLinkFromLocation content={SideBarMenuItems} LinkComponent={RouterLink} />
    </div>
  </nav>
)

class SideBar extends Component {
  render() {
    return this.props.authenticated ? <SideBarHTML /> : null
  }
}

const mapStatetoProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

SideBar = connect(mapStatetoProps)(SideBar)

export { SideBar };
