<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push('/member/pay?id=' + order.id)"
          >立即付款</XtxButton
        >
        <XtxButton type="gray" size="small" @click="handlerCancel"
          >取消订单</XtxButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买
        </XtxButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <XtxButton type="primary" size="small" @click="handlerConfirm"
          >确认收货</XtxButton
        >
        <XtxButton
          type="plain"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买
        </XtxButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买
        </XtxButton>
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买
        </XtxButton>
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
    <Teleport to="#model">
      <OrderCancel ref="orderCancelCom" />
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { orderStatus } from '@/api/constants';
import { confirmOrder } from '@/api/order';
import Confirm from '@/components/library/Confirm';
import Message from '@/components/library/Message';
import type { Order } from '@/types/order';
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';
import OrderCancel from './order-cancel.vue';

const props = defineProps<{
  modelValue: Order;
}>();

const emit = defineEmits(['update:modelValue']);
const order = useVModel(props, 'modelValue', emit);

const orderCancelCom = ref<InstanceType<typeof OrderCancel>>();

const handlerCancel = () => {
  orderCancelCom.value?.open(order.value);
};

const handlerConfirm = () => {
  Confirm({ text: '亲，您确认收货吗？确认后货款将打给买家。' }).then(() => {
    confirmOrder(order.value.id)
      .then(() => {
        Message({ type: 'success', text: '确认收货成功' });
        // 待收货-->待评价
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
</script>

<style scoped lang="less">
.detail-action {
  display: flex;
  align-items: center;
  width: 100%;
  height: 180px;

  .state {
    width: 220px;
    text-align: center;

    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }

    p {
      margin-bottom: 10px;
      font-size: 16px;
      color: #666;
    }
  }

  .info {
    width: 240px;
    line-height: 30px;

    p {
      color: #999;
    }
  }

  .btn {
    margin-right: 100px;
    text-align: right;
    flex: 1;

    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
