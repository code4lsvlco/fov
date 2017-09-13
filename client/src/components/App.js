import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Header, Sidebar } from './common';
import { Home, Lucity, Trello, Precise, Ian, Api } from './views';

// Stylesheets
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';

const App = (props) => {
  // render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <Helmet>
            <title>FOV</title>
          </Helmet>
          <Sidebar/>
          <div id="page-wrapper" className="gray-bg">
            <Header />
            <Route exact={true} path="/" component={Home} />
            <Route path="/lucity" component={Lucity} />
            <Route path="/ian" component={Ian} />
            <Route path="/api" component={Api} />
            <Route path="/precise" component={Precise} />
            <Route path="/trello" component={Trello} />
          </div>
        </div>
      </BrowserRouter>
    )
  // }
}

export default App;
