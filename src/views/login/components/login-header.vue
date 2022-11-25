<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <h3 class="sub"><slot /></h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      width: 100%;
      height: 132px;
      text-indent: -9999px;
      background: url(../../../assets/images/logo.png) no-repeat center /
        contain;
    }
  }

  .sub {
    margin-bottom: 38px;
    margin-left: 20px;
    font-size: 24px;
    color: #666;
    flex: 1;
    font-weight: normal;
  }

  .entry {
    margin-bottom: 38px;
    width: 120px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: @xtxColor;
      letter-spacing: -5px;
    }
  }

  h1 {
    padding: 0;
    margin: 0;
  }
}
</style>
