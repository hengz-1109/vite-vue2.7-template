import axios from 'axios';
import { MessageBox, Message } from 'element-ui';

import defaultSettings from '@/settings';

import { getToken } from '@/utils/auth.js';

import { useUserStore } from '@/store/index.js';

// 创建请求实例
export const service = axios.create({
  // 指定请求超时的毫秒数
  timeout: defaultSettings.timeout,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const { token } = useUserStore();
    if (token) {
      config.headers['X-Token'] = getToken();
    }
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
    const res = response.data;

    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      // token失效
      if (res.code === 50014) {
        MessageBox.confirm('登录已失效，请重新重新登录', '提示', {
          confirmButtonText: '确认',
          showCancelButton: false,
          type: 'warning',
        }).then(() => {
          const { resetToken } = useUserStore();
          resetToken().then(() => {
            window.location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
