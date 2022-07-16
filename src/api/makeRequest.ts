import axios, {AxiosRequestConfig} from 'axios';
import config from './config';

export default ({
  url = '',
  method = 'get',
  params = {},
  data = null,
  headers = {},
}: AxiosRequestConfig) => {
  if (headers && headers.authorization) {
    headers.authorization = config.token;
  }
  return axios({url, method, params, data, headers}).catch(error => {
    config.errorHandler(error);
    throw error;
  });
};
