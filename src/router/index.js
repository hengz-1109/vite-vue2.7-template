import Vue from 'vue';
import VueRouter from 'vue-router';

import DefaultRouter from './modules/default.js';

Vue.use(VueRouter);

const routes = [...DefaultRouter];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
