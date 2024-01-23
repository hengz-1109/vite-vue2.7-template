import { ref } from 'vue';
import { defineStore } from 'pinia';

import DefaultRouter from '@/router/modules/default.js';
import AsyncRoutes from '@/router/modules/async.js';

export default defineStore('permission', () => {
  const routes = ref([]);
  const addRoutes = ref([]);

  function generateRoutes(roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = AsyncRoutes || [];
      } else {
        accessedRoutes = [];
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
