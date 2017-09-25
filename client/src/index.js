import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux'
// import { store, history } from './state/store';
import { store } from './state/store';
import { AUTH_USER, UNAUTH_USER } from './state/ducks/authentication/types';
import registerServiceWorker from './registerServiceWorker';

import App from './views/App';
// import AppEnvato from './views/AppEnvato';
import AppMaterialUI from './views/material-ui-test/AppMaterialUI';
// import FullWidthGrid from './views/FullWidthGrid';
import { Page as Page404 } from './views/404';

const PlainJane = () => {
  return (<div>Plain Jane Text is Working.</div>)
}

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
} else {
  store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
        <Route component={Page404} />
      </Switch>
    {/* </ConnectedRouter> */}
    </BrowserRouter>
  </Provider>,
  // document.getElementById('app-container')
  document.getElementById('root')
);

registerServiceWorker();
