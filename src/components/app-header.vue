<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <!-- 使用头部导航组件 -->
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 使用头部购物车组件 -->
      <AppHeaderCart />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppHeaderCart from './app-header-cart.vue';
import AppHeaderNav from './app-header-nav.vue';
</script>

<style scoped lang="less">
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      width: 100%;
      height: 132px;
      text-indent: -9999px;
      /* stylelint-disable-next-line function-url-quotes */
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }

  .search {
    position: relative;
    width: 170px;
    height: 32px;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      margin-left: 5px;
      font-size: 18px;
    }

    input {
      padding-left: 5px;
      width: 140px;
      color: #666;
    }
  }
}
</style>
