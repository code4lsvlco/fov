import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { Header, SideBar } from './common';
import { Home ,
         Lucity,
         Precise,
         Snow,
         Ian,
         GridView,
         Users,
         Signin,
         Signout,
         Signup,
         PrivateRoute,
         Page as Page404 } from './indexViews';

// TODO: Cleanup commented components and css imports.

// import lightTheme from './app/themes/lightTheme';
// import darkTheme from './app/themes/darkTheme';
// import grayTheme from './app/themes/grayTheme';

// Stylesheets
// import 'bootstrap/dist/css/bootstrap.css';
// import './stylesheets/app.css';

class App extends Component {
  componentDidMount() {}

  render() {
    const { authenticated } = this.props;
    return (
      // muiTheme={getMuiTheme(lightTheme)}
      <MuiThemeProvider >
        <div id="wrapper">
          {/* <SideBar/> */}
          <Switch>
            <PrivateRoute exact path="/" authenticated={authenticated} component={Home} />
            <PrivateRoute exact path="/lucity" authenticated={authenticated} component={Lucity} />
            <PrivateRoute exact path="/precise" authenticated={authenticated} component={Precise} />
            <PrivateRoute exact path="/snow" authenticated={authenticated} component={Snow} />
            <PrivateRoute exact path="/ian/ian" authenticated={authenticated} component={Ian} />
            <PrivateRoute exact path="/grid" authenticated={authenticated} component={GridView} />
            <PrivateRoute exact path="/settings/users" authenticated={authenticated} component={Users} />
            {/* <Route path={`${match.url}app`} component={MainApp} /> */}
            <Route exact path="/404" component={Page404} />
            {/* <Route exact path="/500" component={Page500} /> */}
            {/* <Route exact path="/confirm-email" component={PageConfirmEmail} /> */}
            {/* <Route exact path="/forgot-password" component={PageForgotPassword} /> */}
            {/* <Route exact path="/fullscreen" component={PageFullscreen} /> */}
            {/* <Route exact path="/lock-screen" component={PageLockScreen} /> */}
            {/* <Route exact path="/login" component={PageLogin} /> */}
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signout" component={Signout} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authentication.authenticated }
}

App = connect(mapStateToProps)(App);
App = withRouter(App);
export default App;
