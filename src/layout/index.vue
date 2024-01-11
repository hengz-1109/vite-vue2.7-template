<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { useLayoutStore } from '@/store/index.js';
import { Navbar, Sidebar, TagsView, AppMain } from './components/index.js';
import ResizeMixin from './mixin/ResizeHandler.js';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    TagsView,
    AppMain,
  },
  mixins: [ResizeMixin],
  computed: {
    layoutStore() {
      return useLayoutStore();
    },
    sidebar() {
      return this.layoutStore.sidebar;
    },
    device() {
      return this.layoutStore.device;
    },
    fixedHeader() {
      return this.layoutStore.fixedHeader;
    },
    needTagsView() {
      return this.layoutStore.tagsView;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.layoutStore.closeSideBar(false);
    },
  },
};
</script>

<style lang="scss" scoped>
$sideBarWidth: 210px;

.app-wrapper {
  @include clearfix;
  @include relative;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  width: calc(100% - $sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
