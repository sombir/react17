import axios from 'axios';

export const BaseURL = '';
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${BaseURL}/api/defender/v1`
});

export { axiosInstance };
export default axiosInstance;
