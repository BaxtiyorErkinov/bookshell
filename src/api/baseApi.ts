import axios, { AxiosRequestConfig } from 'axios';
import { IUser } from '../models/IUser';
import { md5Generator } from '../utils/md5Generator';
import { base_url } from './constants';

const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config || !config.headers) return config;

    const { method, baseURL, url, data } = config;

    const user = JSON.parse(
      localStorage.getItem('userInfo') || '{}',
    ) as IUser;

    config.headers.Sign = md5Generator({
      req: method?.toUpperCase() || '',
      host: baseURL || '',
      endpoint: url || '',
      body: JSON.stringify(data) || '',
      secretkey: user.secret,
    });
    config.headers.Key = user.key;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
