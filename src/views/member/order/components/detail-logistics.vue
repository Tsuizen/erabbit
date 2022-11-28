<template>
  <div class="detail-logistics">
    <p>
      <span>{{ list[0].text }}</span>
      <span>{{ list[0].time }}</span>
    </p>
    <a href="javascript:;" @click="handlerLogistics">查看物流</a>
    <Teleport to="#model">
      <OrderLogistics ref="orderLogisticsCom" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { logisticsOrder } from '@/api/order';
import type { Order } from '@/types/order';
import { ref } from 'vue';
import OrderLogistics from './order-logistics.vue';
const props = defineProps<{
  order: Order;
}>();

const data = await logisticsOrder(props.order.id);
const list = ref(data.result.list);
const orderLogisticsCom = ref<InstanceType<typeof OrderLogistics> | null>();

const handlerLogistics = () => {
  orderLogisticsCom.value?.open(props.order);
};
</script>

<style scoped lang="less">
.detail-logistics {
  display: flex;
  align-items: center;
  padding: 0 30px;
  margin: 30px 50px 0;
  height: 50px;
  background-color: #f5f5f5;

  > p {
    flex: 1;

    span {
      color: #999;

      &:first-child {
        margin-right: 30px;
      }
    }
  }

  > a {
    text-align: center;
    color: @xtxColor;
  }
}
</style>
