<template>
  <div class="detail-step">
    <XtxSteps :active="order.orderState === 6 ? 1 : order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime"></XtxStepsItem>
      <XtxStepsItem title="付款成功" :desc="order.payTime"></XtxStepsItem>
      <XtxStepsItem title="商品发货" :desc="order.consignTime"></XtxStepsItem>
      <XtxStepsItem title="确认收货" :desc="order.endTime"></XtxStepsItem>
      <XtxStepsItem
        title="订单完成"
        :desc="order.evaluationTime"
      ></XtxStepsItem>
    </XtxSteps>
  </div>
</template>

<script setup lang="ts">
import XtxSteps from '@/components/library/xtx-steps';
import type { Order } from '@/types/order';
defineProps<{
  order: Order;
}>();
</script>

<style scoped lang="less">
.detail-step {
  padding: 20px;
}
</style>
