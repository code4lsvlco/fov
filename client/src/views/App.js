import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Home ,
         Lucity,
         Fleet,
         Fleet2,
         FleetShow,
         Snow,
         Scada,
         Ian,
         GridView,
         Users,
         Signin,
         Signout,
         Signup,
         PrivateRoute,
         Page as Page404 } from './indexViews';

// Stylesheets
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/app.css';

class App extends Component {
  componentDidMount() {}

  render() {
    const { authenticated } = this.props;
    return (
      <MuiThemeProvider >
        <div id="wrapper">
          <Switch>
            <PrivateRoute exact path="/" authenticated={authenticated} component={Home} />
            <PrivateRoute exact path="/lucity" authenticated={authenticated} component={Lucity} />
            <PrivateRoute exact path="/precise/fleet/:objectID" authenticated={authenticated} component={FleetShow} />
            <PrivateRoute exact path="/precise/fleet" authenticated={authenticated} component={Fleet} />
            <PrivateRoute exact path="/precise/fleet2" authenticated={authenticated} component={Fleet2} />
            <PrivateRoute exact path="/snow" authenticated={authenticated} component={Snow} />
            <PrivateRoute exact path="/scada" authenticated={authenticated} component={Scada} />
            <PrivateRoute exact path="/ian/expenses" authenticated={authenticated} component={Ian} />
            <PrivateRoute exact path="/ian/revenues" authenticated={authenticated} component={Ian} />
            <PrivateRoute exact path="/settings/grid" authenticated={authenticated} component={GridView} />
            <PrivateRoute exact path="/settings/users" authenticated={authenticated} component={Users} />
            {/* <Route path={`${match.url}app`} component={MainApp} /> */}
            <Route exact path="/404" component={Page404} />
            {/* <Route exact path="/500" component={Page500} /> */}
            {/* <Route exact path="/confirm-email" component={PageConfirmEmail} /> */}
            {/* <Route exact path="/forgot-password" component={PageForgotPassword} /> */}
            {/* <Route exact path="/fullscreen" component={PageFullscreen} /> */}
            {/* <Route exact path="/lock-screen" component={PageLockScreen} /> */}
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
