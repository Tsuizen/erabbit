<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="'cart'">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon icon-font icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功</p>
          <p v-if="order.countdown > -1">
            支付还剩<span>{{ timeText }}</span
            >，超时后将取消订单
          </p>
          <p>订单已超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>&yen;{{ order.payMoney }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">请选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a href="javascript:;" class="btn wx"></a>
          <a
            class="btn alipay"
            @click="visibleDialog = true"
            :href="payUrl"
            target="_blank"
          ></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a href="javascipt:;" class="btn">招商银行</a>
          <a href="javascipt:;" class="btn">工商银行</a>
          <a href="javascipt:;" class="btn">建设银行</a>
          <a href="javascipt:;" class="btn">农业银行</a>
          <a href="javascipt:;" class="btn">交通银行</a>
        </div>
      </div>
    </div>
    <!-- 支付对话框 -->
    <XtxDialog title="正在支付..." v-model:visible="visibleDialog">
      <div class="pay-wait">
        <img src="@/assets/images/load.gif" alt="" />
        <div v-if="order">
          <p>如果支付成功：</p>
          <RouterLink :to="`/member/order/${$route.query.orderId}`"
            >查看订单详情></RouterLink
          >
          <p>如果支付失败：</p>
          <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </XtxDialog>
  </div>
</template>

<script setup lang="ts">
import { findOrderDetail } from '@/api/order';
import { usePayTime } from '@/hooks';
import type { Order } from './pay';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { baseURL } from '@/utils/request';

// 根据地址栏id发请求获取订单数据
const route = useRoute();
const order = ref<Order>();
const { start, timeText } = usePayTime();
const visibleDialog = ref<boolean>(false);

// 支付地址
// const payUrl = '后台服务基准地址+支付页面地址+订单ID+回跳地址'
const redirect = encodeURIComponent('http://www.corho.com:8080/#/pay/callback');
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`;

findOrderDetail(route.query.orderId as string).then((data) => {
  order.value = data.result;
  // 后端提供倒计时
  if (data.result.countdown > -1) {
    start(data.result.countdown);
  }
});
</script>

<style scoped lang="less">
.pay-wait {
  display: flex;
  justify-content: space-around;

  p {
    margin-top: 30px;
    font-size: 14px;
  }

  a {
    color: @xtxColor;
  }
}

.pay-info {
  display: flex;
  align-items: center;
  padding: 0 80px;
  height: 240px;
  background: #fff;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        margin-bottom: 5px;
        font-size: 20px;
      }

      &:last-child {
        font-size: 16px;
        color: #999;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}

.pay-type {
  padding-bottom: 70px;
  margin-top: 20px;
  background-color: #fff;

  p {
    padding-left: 30px;
    height: 70px;
    font-size: 16px;
    line-height: 70px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    display: inline-block;
    margin-left: 30px;
    width: 150px;
    height: 50px;
    text-align: center;
    color: #666;
    border: 1px solid #e4e4e4;
    line-height: 48px;

    &.active,
    &:hover {
      border-color: @xtxColor;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>
