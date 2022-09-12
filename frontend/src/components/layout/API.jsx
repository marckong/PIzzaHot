import axios from 'axios';

export default axios.create({
  baseURL: 'https://desolate-inlet-48037.herokuapp.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
