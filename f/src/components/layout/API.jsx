import axios from 'axios';

export default axios.create({
  baseURL: 'http://18.144.103.106/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
