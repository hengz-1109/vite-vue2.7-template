import { ref } from 'vue';
import { defineStore } from 'pinia';

import DefaultRouter from '@/router/modules/default.js';
import AsyncRoutes from '@/router/modules/async.js';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export default defineStore('permission', () => {
  const routes = ref([]);
  const addRoutes = ref([]);

  function generateRoutes(roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = AsyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(AsyncRoutes, roles);
      }
      addRoutes.value = accessedRoutes;
      routes.value = DefaultRouter.concat(accessedRoutes);
      resolve(accessedRoutes);
    });
  }

  return {
    routes,
    addRoutes,
    generateRoutes,
  };
});
