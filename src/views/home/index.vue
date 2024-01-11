<!--  -->
<script setup>
import { ref } from 'vue';
import { useLayoutStore } from '@/store/index.js';
// 接口功能测试
import { artistList } from '@/api/test.js';

// 防抖、节流
import { debounce, throttle } from '@/utils/index.js';

// 国际化
import { changeLanguage } from '@/locale/index.js';

console.log('store', useLayoutStore());

(async () => {
  const res = await artistList();
  console.log(res);
})();

// 防抖
const isCloseDebounce = ref(false);
const inputChange = (e) => {
  return e.target.value;
};
// 首次立即执行
const debounceChange = debounce(inputChange, 2000, true);
const debounceEvent = (...args) => {
  debounceChange.apply(debounceEvent, args).then((res) => {
    console.log('返回值结果:', res);
  });
};
const openDebounce = () => {
  debounceChange.open();
  isCloseDebounce.value = false;
};
const closeDebounce = () => {
  debounceChange.close();
  isCloseDebounce.value = true;
};

// 节流
const isCloseThrottle = ref(false);
const throttleChange = throttle(inputChange, 5000, true);
const throttleEvent = (...args) => {
  throttleChange.apply(throttleEvent, args).then((res) => {
    console.log('返回值结果:', res);
  });
};
const openThrottle = () => {
  throttleChange.open();
  isCloseThrottle.value = false;
};
const closeThrottle = () => {
  throttleChange.close();
  isCloseThrottle.value = true;
};
</script>

<template>
  <div class="tst">
    <p>
      <SvgIcon name="vite" width="30px" height="30px" />
    </p>

    <p>
      <input type="text" @change="debounceEvent" />
      <button style="margin-left: 10px" @click="isCloseDebounce ? openDebounce() : closeDebounce()">
        {{ isCloseDebounce ? '开启' : '关闭' }}防抖
      </button>
    </p>

    <p>
      <input type="text" @input="throttleEvent" />
      <button style="margin-left: 10px" @click="isCloseThrottle ? openThrottle() : closeThrottle()">
        {{ isCloseThrottle ? '开启' : '关闭' }}节流
      </button>
    </p>

    <p>
      {{ $t('message') }}
      <button style="margin-left: 10px" @click="$i18n.locale === 'zh' ? changeLanguage('en') : changeLanguage('zh')">
        切换
      </button>
    </p>
  </div>
</template>

<style scoped lang="scss">
.tst {
  @include flex-center(column);
}
</style>
