import axios from 'axios';

export default axios.create({
  baseURL: 'https://desolate-inlet-48037.herokuapp.com/',
  // baseURL: 'http://127.0.0.1:8000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
