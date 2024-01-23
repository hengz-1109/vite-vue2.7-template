import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import router from './router';
import { useUserStore, usePermissionStore } from '@/store/index.js';
import { getToken } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const userStore = useUserStore();
      const hasRoles = userStore.roles && userStore.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roles } = await userStore.getInfo();

          const permissionStore = usePermissionStore();

          const accessRoutes = await permissionStore.generateRoutes(roles);

          accessRoutes.forEach((route) => {
            router.addRoute(route);
          });

          next({ ...to, replace: true });
        } catch (error) {
          await userStore.resetToken();
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
