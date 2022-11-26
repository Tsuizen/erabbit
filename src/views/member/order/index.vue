<template>
  <div class="member-order">
    <!-- tab组件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div v-if="!loading && orderList.length === 0" class="none">暂无数据</div>
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > 0"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    />
    <!-- 取消原因组件 -->
    <OrderCancel ref="orderCancelCom" />
    <!-- 查看物流组件 -->
    <OrderLogistics ref="orderLogisticsCom" />
  </div>
</template>

<script setup lang="ts">
import { orderStatus } from '@/api/constants';
import { deleteOrder, findOrderList } from '@/api/order';
import Confirm from '@/components/library/Confirm';
import Message from '@/components/library/Message';
import XtxTabs from '@/components/library/xtx-tabs';
import XtxTabsPanel from '@/components/library/xtx-tabs-panel';
import { reactive, ref, watch } from 'vue';
import type { Order } from '../type';
import OrderItem from './components/order-item.vue';

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

// 点击选项卡
const tabClick = ({ index }: { index: number }) => {
  reqParams.page = 1;
  reqParams.orderState = index;
};

// 删除订单
const getOrderList = () => {
  loading.value = true;
  findOrderList(reqParams).then((data) => {
    orderList.value = data.result.items;
    console.log(orderList.value);
    total.value = data.result.counts;
    loading.value = false;
  });
};

// 删除订单
const handlerDelete = (order: Order) => {
  Confirm({ text: '亲，您确认删除该订单吗？' })
    .then(() => {
      deleteOrder(order.id).then(() => {
        Message({ type: 'success', text: '删除成功' });
        getOrderList();
      });
    })
    .catch((err) => {
      console.log(err);
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
  position: relative;
  padding: 20px;
  min-height: 400px;
  background: #fff;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255 255 255 / 90%) url(../../../assets/images/loading.gif)
    no-repeat center;
}

.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
