/**
 * @description 防抖
 * @description 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @param {*} fn 函数
 * @param {*} delay 延迟执行时间
 * @param {*} immediate 首次是否需要立即执行
 * @returns
 */
export function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;

  // eslint-disable-next-line func-names
  const _debounce = function (...args) {
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer);

      if (immediate) {
        const result = fn.apply(this, args);
        immediate = false;
        resolve(result);
      } else if (isInvoke) {
        const result = fn.apply(this, args);
        resolve(result);
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          resolve(result);
          timer = null;
        }, delay);
      }
    });
  };

  // 开启防抖
  _debounce.open = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };

  // 取消防抖
  _debounce.close = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = true;
  };

  return _debounce;
}

/**
 * @description 节流
 * @description 在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有第一次生效。
 * @param {*} fn 函数
 * @param {*} interval 时间间隔
 * @param {*} immediate 首次是否需要立即执行
 * @returns
 */
export function throttle(fn, interval, immediate = true) {
  let enableThrottle = true;
  let lastTime = 0;
  let timer = null;

  // eslint-disable-next-line func-names
  const _throttle = function (...args) {
    return new Promise((resolve) => {
      if (!enableThrottle) {
        const result = fn.apply(this, args);
        resolve(result);
      }
      const nowTime = new Date().getTime();
      if (!lastTime && !immediate) lastTime = nowTime;

      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        const result = fn.apply(this, args);
        resolve(result);

        lastTime = nowTime;
        return;
      }

      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = !immediate ? 0 : new Date().getTime();
          const result = fn.apply(this, args);
          resolve(result);
        }, remainTime);
      }
    });
  };

  _throttle.open = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
    enableThrottle = true;
  };

  _throttle.close = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
    enableThrottle = false;
  };

  return _throttle;
}
