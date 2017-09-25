import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
// import reducers from './reducers';
import rootReducer from "./ducks/reducers";

// const history = createHistory();
// const reactRouterReduxMiddleware = routerMiddleware(history);

// const createStoreWithMiddleware = applyMiddleware(reduxThunk,reactRouterReduxMiddleware)(createStore);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// DELETE - From MATERIAL-UI
// const store = createStore(
//   reducers,
//   undefined,
//   compose(applyMiddleware(middleware))
// );

// export { history, store };
export { store };
