<template>
  <div v-if="order" class="member-order-detail">
    <!-- 头部 -->
    <DetailAction v-model="order" />
    <!-- 进度 -->
    <DetailStep :order="order" />
    <!-- 信息 -->
    <Suspense>
      <template #default>
        <DetailLogistics
          v-if="[3, 4, 5].includes(order.orderState)"
          :order="order"
        />
      </template>
      <template #fallback>
        <div class="loading">loading...</div>
      </template>
    </Suspense>
    <DetailInfo :order="order" />
  </div>
</template>

<script setup lang="ts">
import { findOrderDetail } from '@/api/order';
import type { Order } from '@/types/order';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailAction from './components/detail-action.vue';
import DetailInfo from './components/detail-info.vue';
import DetailLogistics from './components/detail-logistics.vue';
import DetailStep from './components/detail-step.vue';

const route = useRoute();
const order = ref<Order>();
findOrderDetail(route.params.id as string).then((data) => {
  order.value = data.result;
});
</script>

<style scoped lang="less">
.member-order-detail {
  height: 100%;
  background: #fff;
}

.loading {
  display: flex;
  align-items: center;
  padding: 0 30px;
  margin: 30px 50px 0;
  height: 50px;
  background-color: #f5f5f5;
}
</style>
