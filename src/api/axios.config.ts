import axios, { AxiosError } from 'axios';
import { BASE_URL } from '@/constants/env';
import toast from 'react-hot-toast';

const axiosreq = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true
});

axiosreq.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config;
})

axiosreq.interceptors.response.use(function (response) {
  return response;
}, function (error: AxiosError) {
  if(error.status === 401){
    window.location.href = '/';
    return;
  }
  if (error.response) {
    toast.error(error.response.data as string)
  } else {
    toast.error('An unexpected error occured')
  }
  return Promise.reject(error);
});

export default axiosreq;