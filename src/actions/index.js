import axios from 'axios';
const ROOT_URL = process.env.API_URL;

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email: email, password: password })
  };
}
