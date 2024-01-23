<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';

import { useUserStore } from '@/store/index.js';

const { proxy } = getCurrentInstance();

const current = ref(0);

const loading = ref(false);

const changeForm = (val) => {
  current.value = val;
};

const passwordType = ref('password');

function showPwd() {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
}

const loginForm = ref({
  username: '',
  password: '',
});

const message = ref('');
const errorMessage = ref('');

const otherQuery = ref({});
const redirect = ref('/');
const { query } = proxy.$route;
if (query) {
  redirect.value = query.redirect;
  otherQuery.value = getOtherQuery(query);
}
function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

function handleLogin() {
  // 校验用户名密码 省略

  // 登录操作
  loading.value = true;
  const { login } = useUserStore();
  login(loginForm.value)
    .then(() => {
      proxy.$router.push({ path: redirect.value || '/', query: otherQuery.value });
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  if (loginForm.value.username === '') {
    proxy.$refs.username.focus();
  } else if (loginForm.value.password === '') {
    proxy.$refs.password.focus();
  }
});
</script>

<template>
  <div class="login">
    <div v-loading="loading" class="main">
      <div class="container login-con" :class="{ 'is-txl': current % 2 === 0, 'is-z200': current === 0 }">
        <div id="login-form" class="form">
          <h2 class="form_title title_2">账户登录</h2>

          <span v-if="message" class="form__span">{{ message }}</span>
          <span v-if="errorMessage" class="form__span__error">{{ errorMessage }}</span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            class="form__input"
            type="text"
            placeholder="请输入账号"
            tabindex="1"
            autocomplete="on"
          />
          <el-input
            ref="password"
            v-model="loginForm.password"
            class="form__input"
            :type="passwordType"
            placeholder="请输入密码"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          >
            <template slot="append">
              <SvgIcon
                :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                width="16px"
                height="16px"
                color="#a0a5a8"
                @click.native="showPwd"
              />
            </template>
          </el-input>

          <div class="form__link__inline">
            <a class="form__link" @click="changeForm(1)">账户注册</a>
            <a class="form__link" @click="changeForm(3)">忘记密码?</a>
          </div>

          <button class="form__button button" @click="handleLogin">登录</button>
        </div>
      </div>

      <div class="container register-con" :class="{ 'is-txl': current % 2 === 0, 'is-z200': current === 1 }">
        <div class="form">
          <h2 class="form_title title_2">账户注册</h2>
          <!-- <span class="form__span">提示信息</span> -->
          <span class="form__span__error">错误提示信息</span>

          <el-input class="form__input" type="text" placeholder="请输入昵称" />
          <el-input class="form__input" type="text" placeholder="请输入邮箱" />
          <el-input class="form__input" type="password" placeholder="请输入密码" />
          <el-input class="form__input" type="password" placeholder="请确认密码" />

          <button class="form__button button">注册</button>
        </div>
      </div>

      <div class="container reset-con" :class="{ 'is-txl': current % 2 === 0, 'is-z200': current === 3 }">
        <div class="form">
          <h2 class="form_title title_2">账户重置</h2>
          <!-- <span class="form__span">提示信息</span> -->
          <span class="form__span__error">错误提示信息</span>

          <el-input class="form__input" type="text" placeholder="请输入昵称" />
          <el-input class="form__input" type="text" placeholder="请输入邮箱" />
          <el-input class="form__input" type="password" placeholder="请输入密码" />
          <el-input class="form__input" type="password" placeholder="请确认密码" />

          <button class="form__button button">重置</button>
        </div>
      </div>

      <div id="switch-cnt" class="switch" :class="{ 'is-txr': current % 2 === 0 }">
        <div class="switch__circle" :class="{ 'is-txr': current % 2 === 0 }"></div>
        <div class="switch__circle switch__circle--t" :class="{ 'is-txr': current % 2 === 0 }"></div>

        <div class="switch__container" :class="{ 'is-hidden': current !== 0 }">
          <h2 class="switch__title title">
            <a href="https://github.com/hengz-1109/vite-vue2.7-template" style="text-decoration: none; color: #181818">
              一个基础模版
            </a>
          </h2>
          <p class="switch__description description">Vite5 + Vue2.7，基于 Vue 2.0 的组件库ElementUI</p>
        </div>

        <div class="switch__container" :class="{ 'is-hidden': current !== 1 }">
          <h2 class="switch__title title">静态界面</h2>
          <p class="switch__description description">仅供展示</p>
          <button class="switch__button button switch-btn" @click="changeForm(0)">
            <i class="el-icon-arrow-left"></i>
            返回登录
          </button>
        </div>

        <div class="switch__container" :class="{ 'is-hidden': current !== 3 }">
          <h2 class="switch__title title">静态界面</h2>
          <p class="switch__description description">仅供展示</p>
          <button class="switch__button button switch-btn" @click="changeForm(0)">
            <i class="el-icon-arrow-left"></i>
            返回登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg: #edf2f0;

$neu-1: #ecf0f3;
$neu-2: #d1d9e6;

$white: #f9f9f9;
$gray: #a0a5a8;
$black: #181818;

$transition: 1s;

.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  color: $gray;
  background-color: $neu-1;

  .main {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    height: 600px;
    min-height: 600px;
    overflow: hidden;
    border-radius: 12px;
    padding: 25px;
    background-color: $neu-1;
    box-shadow: 10px 10px 10px $neu-2, -10px -10px 10px $white;
    @media (width <= 1200px) {
      transform: scale(0.7);
    }
    @media (width <= 1000px) {
      transform: scale(0.6);
    }
    @media (width <= 800px) {
      transform: scale(0.5);
    }
    @media (width <= 600px) {
      transform: scale(0.4);
    }

    .container {
      position: absolute;
      top: 0;
      width: 600px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
      background-color: $neu-1;
      transition: $transition;
    }

    .switch {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 200;
      width: 400px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 50px;
      background-color: $neu-1;
      box-shadow: 4px 4px 10px $neu-2, -4px -4px 10px $white;
      transition: $transition;

      &__circle {
        position: absolute;
        bottom: -60%;
        left: -60%;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        background-color: $neu-1;
        box-shadow: inset 8px 8px 12px $neu-2, inset -8px -8px 12px $white;
        transition: $transition;

        &--t {
          top: -30%;
          left: 60%;
          width: 300px;
          height: 300px;
        }
      }

      &__container {
        position: absolute;
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 50px 55px;
        transition: $transition;
      }

      &__button {
        cursor: pointer;

        &:hover {
          box-shadow: 6px 6px 10px $neu-2, -6px -6px 10px $white;
          transform: scale(0.985);
          transition: 0.25s;
        }

        &:active,
        &:focus {
          box-shadow: 2px 2px 6px $neu-2, -2px -2px 6px $white;
          transform: scale(0.97);
          transition: 0.25s;
        }
      }
    }

    .is-txr {
      left: calc(100% - 400px);
      transition: $transition;
      transform-origin: left;
    }

    .is-txl {
      left: 0;
      transition: $transition;
      transform-origin: right;
    }

    .is-z200 {
      z-index: 200;
      transition: $transition;
    }

    .is-hidden {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: $transition;
    }
  }
}

.login-con {
  left: calc(100% - 600px);
  z-index: 0;
}

.register-con {
  left: calc(100% - 600px);
  z-index: 100;
}

.reset-con {
  left: calc(100% - 600px);
  z-index: 100;
}

.form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__icon {
    object-fit: contain;
    width: 30px;
    margin: 0 5px;
    opacity: 0.5;
    transition: 0.15s;

    &:hover {
      opacity: 1;
      transition: 0.15s;
      cursor: pointer;
    }
  }

  &__input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    border: none;
    border-radius: 8px;
    padding: 0;
    font-size: 13px;
    font-family: Montserrat, sans-serif;
    background-color: $neu-1;
    outline: none;
    box-shadow: inset 2px 2px 4px $neu-2, inset -2px -2px 4px $white;
    transition: 0.25s ease;
    letter-spacing: 0.15px;

    ::v-deep .el-input__inner {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;

      &:focus {
        box-shadow: inset 4px 4px 4px $neu-2, inset -4px -4px 4px $white;
      }
    }

    ::v-deep .el-input-group__append {
      position: relative;
      border: none;
      background: transparent;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &__span {
    margin-top: 12px;
    margin-bottom: 12px;

    &__error {
      margin-top: 12px;
      margin-bottom: 12px;
      color: rgb(248 23 23 / 79.9%);
    }
  }

  &__link {
    margin-top: 25px;
    border-bottom: 1px solid $gray;
    font-size: 14px;
    color: $black;
    line-height: 2;
    cursor: pointer;
  }

  &__link__inline {
    width: 320px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .form__link {
      margin-top: 0;
    }
  }
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: $black;
}

.title_2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 3;
  color: $black;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  margin-top: 30px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.15px;
  color: $white;
  background-color: $--color-primary;
  outline: none;
  box-shadow: 8px 8px 16px $neu-2, -8px -8px 16px $white;
}
</style>
