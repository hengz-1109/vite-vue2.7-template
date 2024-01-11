import Vue from 'vue';

// 导入 Pinia
import { createPinia } from 'pinia';

// 导入ELementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import { I18n } from './locale';

import 'virtual:svg-icons-register';

import './style/global.scss';

// 注册自定义全局组件
import globalComponent from '@/components/index.js';

Vue.use(createPinia());
Vue.use(ElementUI, { size: 'small', zIndex: 2000, i18n: (key, value) => I18n.t(key, value) });

Vue.use(globalComponent);

const app = new Vue({
  router,
  i18n: I18n,
  render: (h) => h(App),
}).$mount('#app');

export default app;
