import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status > 500;

  if (expectedError) {
    console.log('Error log:', error);
    toast.error('An unexpected error occured.')
  }

  return Promise.reject(error);
});

function setToken(token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken
};