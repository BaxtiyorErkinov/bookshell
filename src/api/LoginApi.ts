import axios from 'axios';
import { base_url } from './constants';

const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosInstance;
