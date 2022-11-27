<template>
  <XtxDialog v-model:visible="visibleDialog" title="取消订单">
    <!-- 取消原因列表 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          v-for="item in cancelReason"
          :key="item"
          :class="{ active: currText === item }"
          href="javascript:;"
          @click="currText = item"
          >{{ item }}</a
        >
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="visibleDialog = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="submit">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script setup lang="ts">
import { cancelReason } from '@/api/constants';
import { cancelOrder } from '@/api/order';
import Message from '@/components/library/Message';
import type { Order } from '@/types/order';
import { ref } from 'vue';

const visibleDialog = ref<boolean>(false);
const currOrder = ref<Order>();
const open = (order: Order) => {
  visibleDialog.value = true;
  currOrder.value = order;
};

// 选中的原因
const currText = ref<string>('');
// 确认
const submit = () => {
  if (!currText.value) {
    return Message({ text: '亲，请选择取消原因' });
  }
  cancelOrder({
    orderId: currOrder.value?.id as string,
    cancelReason: currText.value
  }).then(() => {
    Message({ type: 'success', text: '取消订单成功' });
    currOrder.value!.orderState = 6;
    visibleDialog.value = false;
  });
};

defineExpose({ open });
</script>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}

.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;

    &.tip {
      color: #999;
    }
  }

  .btn {
    display: flex;
    padding-top: 21px;
    flex-wrap: wrap;

    a {
      margin-right: 20px;
      margin-bottom: 20px;
      width: 256px;
      height: 45px;
      text-align: center;
      color: #666;
      background-color: #fff;
      border: 1px solid #e4e4e4;
      line-height: 45px;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
