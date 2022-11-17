<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          href="javascript:;"
          @click="activeName = 'account'"
          :class="{ acitve: activeName === 'account' }"
          >账户登录</a
        >
        <a
          href="javascript:;"
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          >扫码登录</a
        >
      </nav>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<script setup lang="ts">
import LoginHeader from './components/login-header.vue';
import LoginFooter from './components/login-footer.vue';
import LoginForm from './components/login-form.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';

const activeName = ref('account');
const route = useRoute();
const userStore = useUserStore();
const { setRedirectUrl } = userStore;

// 存储回跳地址
setRedirectUrl(route.query.redirectUrl || '/');
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
</style>
