<template>
  <div class="member-order">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script setup lang="ts">
import { findOrderList } from '@/api/order';
import XtxTabs from '@/components/library/xtx-tabs';
import { reactive, ref, watch } from 'vue';
import type { Order } from '../pay/pay';
import { orderStatus } from '@/api/constants';

interface ReqParams {
  page: number;
  pageSize: number;
  orderState: number;
}

const activeName = ref<string>('all');
// 筛选条件
const reqParams = reactive<ReqParams>({
  page: 1,
  pageSize: 5,
  orderState: 0
});

const orderList = ref<Order[]>([]);
const loading = ref<boolean>(false);
const total = ref<number>(0);

const tabClick = ({ index }: { index: number }) => {
  reqParams.page = 1;
  reqParams.orderState = index;
};

const getOrderList = () => {
  loading.value = true;
  findOrderList(reqParams).then((data) => {
    orderList.value = data.result.items;
    total.value = data.result.counts;
    loading.value = false;
  });
};

watch(
  reqParams,
  () => {
    getOrderList();
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
