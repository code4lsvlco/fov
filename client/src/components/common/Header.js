import React from 'react';
// import {Dropdown} from 'react-bootstrap';
// import {smoothlyMenu} from '../layouts/Helpers';
import 'font-awesome/css/font-awesome.css'

import FontAwesome from 'react-fontawesome';

class Header extends React.Component {

  toggleNavigation(e) {
    e.preventDefault();
    // $("body").toggleClass("mini-navbar");
    // smoothlyMenu();
  }

  render() {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top gray-bg" role="navigation" style={{
          marginBottom: 0
        }}>
          <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#">
              <FontAwesome name='bars'/>
            </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a href="#">
                <FontAwesome name='sign-out'/>
                Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export { Header };
