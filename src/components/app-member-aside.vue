<template>
  <div class="xtx-member-aside">
    <div class="user-manage">
      <h4>我的账户</h4>
      <div class="links">
        <RouterLink exact-active-class="active" to="/member"
          >个人中心</RouterLink
        >
        <a href="javascript:;">消息通知</a>
        <a href="javascript:;">个人信息</a>
        <a href="javascript:;">安全设置</a>
        <a href="javascript:;">地址管理</a>
        <a href="javascript:;">我的积分</a>
        <a href="javascript:;">我的足迹</a>
        <a href="javascript:;">邀请有礼</a>
        <a href="javascript:;">幸运抽奖</a>
      </div>
      <h4>交易管理</h4>
      <div class="links">
        <RouterLink active-class="active" to="/member/order"
          >我的订单</RouterLink
        >
        <a href="javascript:;">优惠券</a>
        <a href="javascript:;">礼品卡</a>
        <a href="javascript:;">评价晒单</a>
        <a href="javascript:;">售后服务</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.xtx-member-aside {
  margin-right: 20px;
  width: 220px;
  border-radius: 2px;

  .user-manage {
    background-color: #fff;

    h4 {
      padding: 20px 52px 5px;
      font-size: 18px;
      font-weight: 400;
      border-top: 1px solid #f6f6f6;
    }

    .links {
      padding: 0 52px 10px;
    }

    a {
      position: relative;
      display: block;
      padding: 15px 0;
      font-size: 14px;
      color: #666;
      line-height: 1;

      &:hover {
        color: @xtxColor;
      }

      &.active {
        color: @xtxColor;

        &::before {
          display: block;
        }
      }

      &::before {
        position: absolute;
        top: 19px;
        left: -16px;
        display: none;
        width: 6px;
        height: 6px;
        background-color: @xtxColor;
        border-radius: 50%;
        /* stylelint-disable-next-line string-quotes */
        content: '';
      }
    }
  }
}
</style>
