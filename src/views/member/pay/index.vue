<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="'cart'">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon icon-font icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功</p>
          <p>支付还剩<span>{{}}</span>，超时后将取消订单</p>
          <p>订单已超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>&yen;{{}}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">请选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a href="javascript:;" class="btn wx"></a>
          <a href="javascript:;" class="btn aliapy" target="_blank"></a>
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
    <XtxDialog title="正在支付...">
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 根据地址栏id发请求获取订单数据
const route = useRoute();
const order = ref();
const { start, timeText } = usePayTime();
findOrderDetail(route.query.orderId as string).then((data) => {
  order.value = data.result;
  // 后端提供倒计时
  if (data.result.countdown > -1) {
    start(data.result.countdown);
  }
});

// 支付地址
</script>

<style scoped lang="less"></style>
