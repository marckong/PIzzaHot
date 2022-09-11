import axios from 'axios';

export default axios.create({
  baseURL: 'https://18.144.103.106/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
