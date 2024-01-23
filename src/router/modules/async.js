export default [
  {
    path: '/example',
    component: () => import('@/layout/index.vue'),
    redirect: '/example/interface',
    name: 'Example',
    meta: { title: '示例', icon: 'el-icon-help' },
    children: [
      {
        path: 'interface',
        name: 'Interface',
        component: () => import('@/views/example/interface.vue'),
        meta: { title: '接口功能', icon: 'el-icon-collection-tag' },
      },
      {
        path: 'debounceAndThrottle',
        name: 'DebounceAndThrottle',
        component: () => import('@/views/example/debounceAndThrottle.vue'),
        meta: { title: '防抖节流', icon: 'el-icon-collection-tag' },
      },
    ],
  },
];
