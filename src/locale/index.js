import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import en from './lang/en.js';
import zh from './lang/zh.js';

import App from '@/main.js';

Vue.use(VueI18n);

const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale),
};

const I18n = new VueI18n({
  locale: 'zh',
  messages,
});

/**
 * @description 多语言切换
 * @param {String} type
 */
function changeLanguage(type) {
  if (Object.keys(messages).includes(type)) {
    App.$i18n.locale = type;
  }
}

export { I18n, changeLanguage };
