import axios from 'axios';
import defaultSettings from '@/settings';

// 创建请求实例
export const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 指定请求超时的毫秒数
  timeout: defaultSettings.timeout,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default service;
