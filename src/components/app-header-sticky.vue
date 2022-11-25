<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container" v-show="y >= 78">
      <RouterLink to="/" class="logo" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeaderNav from './app-header-nav.vue';
import { RouterLink } from 'vue-router';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();
</script>

<style scoped lang="less">
.app-header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  background-color: #fff;
  opacity: 0;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);

  &.show {
    opacity: 1;
    transition: all 0.3s linear;
    transform: none;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    /* stylelint-disable-next-line function-url-quotes */
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    display: flex;
    padding-left: 40px;
    width: 220px;
    text-align: center;
    border-left: 2px solid @xtxColor;

    a {
      margin-right: 40px;
      width: 38px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
