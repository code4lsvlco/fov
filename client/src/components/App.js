import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { Header, Sidebar } from './common';
import { Home, Lucity, Trello, Precise, Ian, Api } from './views';
import Signin from './authorization/Signin';
import Signout from './authorization/Signout';
import Signup from './authorization/Signup';
import RequireAuth from './authorization/RequireAuth';
import PrivateRoute from './authorization/PrivateRoute';
import reducers from '../reducers';
import { AUTH_USER, UNAUTH_USER } from '../actions/types';

// Stylesheets
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/App.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({ type: UNAUTH_USER });
}

const RequireAuthFeature = () => {return(<div>Logged in to RequireAuthFeature</div>)}

const PrivateRouteFeature = () => {return(<h3>Logged in to PrivateRouteFeature</h3>)}

const App = (props) => {
  // render() {
    return (
      <Provider store={store}>
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
              <Route path="/signin" component={Signin} />
              <Route path="/signout" component={Signout} />
              <Route path="/signup" component={Signup} />
              <Route path="/requireauth" component={RequireAuth(RequireAuthFeature)} />
              <PrivateRoute path="/privateroute" component={PrivateRouteFeature}/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  // }
}

export default App;
