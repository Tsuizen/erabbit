<template>
  <!-- 概览 -->
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img src="@/assets/images/avatar.png" />
      </div>
      <h4>张三</h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.home-overview {
  display: flex;
  height: 132px;
  background: url(../../../../assets/images/center-bg.png) no-repeat center /
    cover;

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      overflow: hidden;
      margin-left: 60px;
      width: 85px;
      height: 85px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }

  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;

    &:first-child {
      border-right: 1px solid #f4f4f4;
    }

    a {
      font-size: 16px;
      text-align: center;
      color: white;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}
</style>
