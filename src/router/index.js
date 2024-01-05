import Vue from 'vue';
import VueRouter from 'vue-router';

// 根据页面功能的不同拆分到 modules 文件夹中，以方便后期维护
import DefaultRouter from './modules/default.js';

Vue.use(VueRouter);

const routes = [...DefaultRouter];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
