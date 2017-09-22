import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

// const ROOT_URL = 'http://localhost:5000'; // TODO Fix This to be from .env or iis process.env

export function signinUser({ email, password, history, to}) {
  return function(dispatch) {
    // axios.post(`${ROOT_URL}/auth/signin`, { email, password })
    axios.post(`/auth/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        // history.push(to);
        history.push("/");
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

// TODO - Update signupUser to match signinUser
export function signupUser(token, history) {
  return function(dispatch) {
    // axios.post(`/auth/signup`, { email, password })
      // .then(response => {
        console.log("signupUser");
        console.log(history);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', token);
        history.push("/");
      // })
      // .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

// export function fetchMessage() {
//   return function(dispatch) {
//     axios.get(ROOT_URL, {
//       headers: { authorization: localStorage.getItem('token') }
//     })
//       .then(response => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message
//         });
//       });
//   }
// }
