import { useLayoutStore } from '@/store/index.js';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  computed: {
    layoutStore() {
      return useLayoutStore();
    },
  },
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.layoutStore.closeSideBar(false);
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.layoutStore.toggleDevice('mobile');
      this.layoutStore.closeSideBar(false);
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        this.layoutStore.toggleDevice(isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          this.layoutStore.closeSideBar(true);
        }
      }
    },
  },
};
