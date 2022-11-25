<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
  </div>
</template>

<script setup lang="ts">
import { findOrderDetail } from '@/api/order';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Order } from '../pay/pay';

const route = useRoute();
const order = ref<Order>();
findOrderDetail(route.params.id as string).then((data) => {
  order.value = data.result;
});
</script>
