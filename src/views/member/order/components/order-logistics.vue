<template>
  <XtxDialog v-model:visible="visibleDialog" title="查看物流">
    <div v-if="logistics" class="order-logistics-goods">
      <a class="image" href="javascript:;">
        <img :src="logistics.picture" alt="" />
        <p>{{ logistics.count }}件商品</p>
      </a>
      <div class="info">
        <p><span>配送企业：</span>{{ logistics.company.name }}</p>
        <p><span>快递单号：</span>{{ logistics.company.number }}</p>
        <p><span>联系电话：</span>{{ logistics.company.tel }}</p>
      </div>
    </div>
    <div v-if="logistics" class="order-logistics-list">
      <div v-for="(item, i) in logistics.list" :key="item.id" class="item">
        <div class="line" :class="{ active: i === 0 }"></div>
        <div class="logistics">
          <p>{{ item.text }}</p>
          <p>{{ item.time }}</p>
        </div>
      </div>
    </div>
  </XtxDialog>
</template>

<script setup lang="ts">
import { logisticsOrder } from '@/api/order';
import type { Logistics, Order } from '@/types/order';
import { ref } from 'vue';
const visibleDialog = ref<boolean>(false);
const logistics = ref<Logistics>();

const open = (order: Order) => {
  visibleDialog.value = true;
  // 查询物流
  logisticsOrder(order.id).then((data) => {
    logistics.value = data.result;
  });
};

defineExpose({ open });
</script>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 680px;
}

.order-logistics-goods {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  height: 130px;
  font-size: 14px;
  background-color: #f5f5f5;

  .image {
    position: relative;
    width: 92px;
    height: 92px;
    border: 1px solid #e4e4e4;

    p {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      text-align: center;
      color: #fff;
      background-color: rgb(0 0 0 / 50%);
      line-height: 20px;
    }
  }

  .info {
    flex: 1;
    padding-left: 20px;
    line-height: 30px;

    span {
      color: #999;
    }
  }
}

.order-logistics-list {
  position: relative;
  padding-top: 10px;
  font-size: 14px;

  .item {
    display: flex;

    &:last-child {
      .line {
        border-color: transparent;

        &::before {
          top: 0;
        }
      }
    }

    .line {
      position: relative;
      margin-right: 25px;
      width: 27px;
      border-right: 2px solid #f5f5f5;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        background: #e4e4e4;
        border-radius: 50%;
        content: '';
        transform: translate(7px, 0);
      }

      // 激活
      &.active {
        &::before {
          z-index: 1;
          background: @xtxColor;
        }

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          background: #e3f9f4;
          border-radius: 50%;
          content: '';
          transform: translate(11px, -4px);
        }
      }
    }

    .logistics {
      position: relative;
      top: -3px;
      padding-bottom: 35px;
      flex: 1;

      p {
        &:first-child {
          color: #666;
        }

        &:last-child {
          margin-top: 6px;
          color: #999;
        }
      }
    }
  }
}
</style>
