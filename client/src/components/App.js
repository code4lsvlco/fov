import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { AUTH_USER, UNAUTH_USER } from '../actions/types';

import Signin from './authorization/Signin';
import Signout from './authorization/Signout';
import Signup from './authorization/Signup';

import { Header, SideBar } from './common';
import { Home, Lucity, Trello, Precise, Ian, Api, Settings, Users } from './views';
import PrivateRoute from './authorization/PrivateRoute';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Stylesheets
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/App.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({ type: UNAUTH_USER });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <div id="wrapper">
              <SideBar />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/signin" component={Signin} />
                <Route path="/signout" component={Signout} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/lucity" component={Lucity} />
                <PrivateRoute path="/ian" component={Ian} />
                <PrivateRoute path="/api" component={Api} />
                <PrivateRoute path="/precise" component={Precise} />
                <PrivateRoute path="/trello" component={Trello} />
                <PrivateRoute path="/settings/users" component={Users} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
