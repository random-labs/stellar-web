import axios from 'axios';
//Communicate information about the url to react-router
import { browserHistory } from 'react-router';
const ROOT_URL = process.env.API_URL;
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
 } from './types';

export function signinUser({ email, password }) {

  //Using redux-thunk, so return function instead of action.
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email: email, password: password })
    .then(response => {
      // If request is ok, update state to authenticated
      dispatch({ type: AUTH_USER });
      // Save the JWT token in localstorage
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(() => {
      // If request is bad, show error
      dispatch(authError('Wrong login info'));
    });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/signup`, { email, password })
        //Success case
        .then(response => {
          // If request is good, dispatch an action of type AUTH_USER. Updates state to indicate user is authenticated
          dispatch({ type: AUTH_USER });
          // Save the JWT token in localstorage
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/feature');
        })
        //Fail case - handle errors from backend (for ex email is already in use) - authError is actioncreator below. Pass it a string and it will send error message down to our different components
        .catch(error =>
          dispatch(authError(error.response.data.error))
        );
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
