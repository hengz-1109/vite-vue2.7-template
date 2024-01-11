import { ref } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import defaultSettings from '@/settings.js';

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings;

export default defineStore('layout', () => {
  const device = ref('desktop');

  function toggleDevice(val) {
    device.value = val;
  }

  const state = ref({
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
  });

  const avatar = ref('https://cn.vitejs.dev/logo-with-shadow.png');

  function changeSetting(key, value) {
    if (state.value.hasOwnProperty(key)) {
      state[key] = value;
    }
  }

  const sidebar = ref({
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  });

  function closeSideBar(withoutAnimation) {
    sidebar.value.opened = false;
    sidebar.value.withoutAnimation = withoutAnimation;
    Cookies.set('sidebarStatus', 0);
  }

  function toggleSideBar() {
    sidebar.value.opened = !sidebar.value.opened;
    sidebar.value.withoutAnimation = false;
    if (sidebar.value.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  }

  const visitedViews = ref([]);
  const cachedViews = ref([]);

  function addView(view) {
    addVisitedView(view);
    addCachedView(view);
  }

  function addVisitedView(view) {
    if (visitedViews.value.some((v) => v.path === view.path)) return;
    visitedViews.value.push({ ...view, title: view.meta.title || 'no-name' });
  }

  function addCachedView(view) {
    if (cachedViews.value.includes(view.name)) return;
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name);
    }
  }

  function delView(view) {
    return new Promise((resolve) => {
      delVisitedView(view);
      delCachedView(view);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      });
    });
  }

  function delVisitedView(view) {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1);
          break;
        }
      }
      resolve([...visitedViews.value]);
    });
  }

  function delCachedView(view) {
    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(view.name);
      if (index > -1) cachedViews.value.splice(index, 1);
      resolve([...cachedViews.value]);
    });
  }

  function delOthersViews(view) {
    return new Promise((resolve) => {
      delOthersVisitedViews(view);
      delOthersCachedViews(view);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      });
    });
  }

  function delOthersVisitedViews(view) {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((v) => v.meta.affix || v.path === view.path);
      resolve([...visitedViews.value]);
    });
  }
  function delOthersCachedViews(view) {
    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(view.name);
      if (index > -1) {
        cachedViews.value = cachedViews.value.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        cachedViews.value = [];
      }
      resolve([...cachedViews.value]);
    });
  }

  function delAllViews(view) {
    return new Promise((resolve) => {
      delAllVisitedViews(view);
      delAllCachedViews(view);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      });
    });
  }
  function delAllVisitedViews() {
    return new Promise((resolve) => {
      // keep affix tags
      const affixTags = visitedViews.value.filter((tag) => tag.meta.affix);
      visitedViews.value = affixTags;
      resolve([...visitedViews.value]);
    });
  }
  function delAllCachedViews() {
    return new Promise((resolve) => {
      cachedViews.value = [];
      resolve([...cachedViews.value]);
    });
  }

  function updateVisitedView(view) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }

  return {
    device,
    toggleDevice,

    showSettings: state.value.showSettings,
    tagsView: state.value.tagsView,
    fixedHeader: state.value.fixedHeader,
    sidebarLogo: state.value.sidebarLogo,
    avatar,
    changeSetting,

    sidebar,
    toggleSideBar,
    closeSideBar,

    visitedViews,
    cachedViews,
    addView,
    addVisitedView,
    addCachedView,
    delView,
    delVisitedView,
    delCachedView,
    delOthersViews,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView,
  };
});
