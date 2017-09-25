import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import authenticationReducer from "./authentication/reducers";
// import settings from './settings';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  authentication: authenticationReducer
  // settings
});

export default rootReducer;
