// 注册自定义组件
import SvgIcon from './SvgIcon/index.vue';

const allGlobalComponents = { SvgIcon };

export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach((componentName) => {
      app.component(componentName, allGlobalComponents[componentName]);
    });
  },
};
