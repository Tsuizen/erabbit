<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          :class="{ active: activeName === 'account' }"
          href="javascript:;"
          @click="activeName = 'account'"
          >账户登录</a
        >
        <a
          :class="{ active: activeName === 'qrcode' }"
          href="javascript:;"
          @click="activeName = 'qrcode'"
          >扫码登录</a
        >
      </nav>
      <!-- 帐号登录&扫码登录 -->
      <LoginForm v-if="activeName === 'account'">表单</LoginForm>
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.png" alt="" />
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import LoginFooter from './components/login-footer.vue';
import LoginForm from './components/login-form.vue';
import LoginHeader from './components/login-header.vue';

const activeName = ref('account');
const route = useRoute();
const userStore = useUserStore();
const { setRedirectUrl } = userStore;

// 存储回跳地址
setRedirectUrl(route.query.redirectUrl || '/');
</script>

<style scoped lang="less">
.login-section {
  position: relative;
  height: 488px;
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;

  .wrapper {
    position: absolute;
    top: 54px;
    left: 50%;
    width: 380px;
    min-height: 400px;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    transform: translate3d(100px, 0, 0);

    nav {
      display: flex;
      align-items: center;
      padding: 0 40px;
      height: 55px;
      text-align: right;
      border-bottom: 1px solid #f5f5f5;

      a {
        position: relative;
        display: inline-block;
        font-size: 18px;
        flex: 1;
        line-height: 1;

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
  padding-top: 40px;
  text-align: center;

  p {
    margin-top: 20px;

    a {
      font-size: 16px;
      color: @xtxColor;
    }
  }
}
</style>
