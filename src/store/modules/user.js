import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@/utils/auth.js';
import { useLayoutStore, usePermissionStore } from '@/store/index.js';

import router, { resetRouter } from '@/router/index.js';

import { login as loginRequest, logout as logoutRequest, getInfo as getInfoRequest } from '@/api/user.js';

export default defineStore('user', () => {
  const token = ref(getToken());
  const name = ref('');
  const introduction = ref('');
  const roles = ref([]);

  function login(userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      loginRequest({ username: username.trim(), password })
        .then((response) => {
          const { data } = response;
          token.value = data.token;
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getInfo() {
    return new Promise((resolve, reject) => {
      getInfoRequest(token.value)
        .then((response) => {
          const { data } = response;

          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('验证失败，请重新登录。');
          }

          if (!data.roles || data.roles.length <= 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getInfo: 角色必须是非null数组!');
          }
          roles.value = data.roles;
          name.value = data.name;
          introduction.value = data.introduction;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function logout() {
    return new Promise((resolve, reject) => {
      logoutRequest(token.value)
        .then(() => {
          token.value = '';
          roles.value = [];
          removeToken();
          resetRouter();
          const layoutStore = useLayoutStore();
          layoutStore.delAllViews();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function resetToken() {
    return new Promise((resolve) => {
      token.value = '';
      roles.value = [];
      removeToken();
      resolve();
    });
  }

  // dynamically modify permissions
  async function changeRoles(role) {
    const token = `${role}-token`;

    token.value = token;
    setToken(token);

    const { roles } = await getInfo();

    resetRouter();

    const permissionStore = usePermissionStore();
    const accessRoutes = await permissionStore.generateRoutes(roles);
    accessRoutes.forEach((route) => {
      router.addRoute(route);
    });

    const layoutStore = useLayoutStore();
    layoutStore.delAllViews();
  }

  return {
    token,
    name,
    introduction,
    roles,
    login,
    getInfo,
    logout,
    resetToken,
    changeRoles,
  };
});
