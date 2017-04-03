import axios from 'axios';
//Communicate information about the url to react-router
import { browserHistory } from 'react-router';
const ROOT_URL = process.env.API_URL;
import {
  AUTH_USER,
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

      // Redirect to the route '/feature' programmatically
      //browserHistory.push('/feature');
    })
    .catch(() => {
      // If request is bad, show error
      dispatch(authError('Wrong login info'));
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
