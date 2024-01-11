import service from '@/utils/request_mock.js';

export function login(data) {
  return service({
    url: '/mock/user/login',
    method: 'post',
    data,
  });
}

export function getInfo(token) {
  return service({
    url: '/mock/user/info',
    method: 'get',
    params: { token },
  });
}

export function logout() {
  return service({
    url: '/mock/user/logout',
    method: 'post',
  });
}
