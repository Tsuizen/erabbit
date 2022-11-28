<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span v-if="order.orderState === 1" class="down-time">
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ timeText }}</b>
      </span>
      <a
        v-if="[5, 6].includes(order.orderState)"
        href="javascript:;"
        class="del"
        @click="emit('on-delete', order)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <RouterLink class="image" :to="`/product/${goods.spuId}`">
              <img :src="goods.image" alt="" />
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <!-- 待收货  查看物流 -->
        <!-- 待评价  评价商品 -->
        <!-- 已完成  查看评价 -->
        <p v-if="order.orderState === 3" @click="emit('on-logistics', order)">
          <a class="green" href="javascript:;">查看物流</a>
        </p>
        <p v-if="order.orderState === 4">
          <a class="green" href="javascript:;">评价商品</a>
        </p>
        <p v-if="order.orderState === 5">
          <a class="green" href="javascript:;">查看评价</a>
        </p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 待支付：立即付款，查看详情，取消订单 -->
        <!-- 待发货：查看详情，再次购买 -->
        <!-- 待收货：确认收货，查看详情，再次购买 -->
        <!-- 待评价：查看详情，再次购买，申请售后 -->
        <!-- 已完成：查看详情，再次购买，申请售后 -->
        <!-- 已取消：查看详情 -->
        <XtxButton
          v-if="order.orderState === 1"
          type="primary"
          size="small"
          @click="router.push(`/member/pay?orderId=${order.id}`)"
          >立即付款</XtxButton
        >
        <XtxButton
          v-if="order.orderState === 3"
          type="primary"
          size="small"
          @click="emit('on-confirm', order)"
          >确认收货</XtxButton
        >
        <p>
          <a
            href="javascript:;"
            @click="router.push(`/member/order/${order.id}`)"
            >查看详情</a
          >
        </p>
        <p v-if="order.orderState === 1" @click="emit('on-cancel', order)">
          <a href="javascript:;">取消订单</a>
        </p>
        <p
          v-if="[2, 3, 4, 5].includes(order.orderState)"
          @click="router.push(`/member/checkout?orderId=${order.id}`)"
        >
          <a href="javascript:;">再次购买</a>
        </p>
        <p v-if="[4, 5].includes(order.orderState)">
          <a href="javascript:;">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderStatus } from '@/api/constants';
import { usePayTime } from '@/hooks';
import type { Order } from '@/types/order';
import { useRouter } from 'vue-router';

const props = defineProps<{
  order: Order;
}>();

const emit = defineEmits([
  'on-cancel',
  'on-delete',
  'on-confirm',
  'on-logistics'
]);

const router = useRouter();
const { start, timeText } = usePayTime();
start(props.order.countdown);
</script>

<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    overflow: hidden;
    padding: 0 20px;
    height: 50px;
    background: #f5f5f5;
    line-height: 50px;

    span {
      margin-right: 20px;

      &.down-time {
        float: right;
        margin-right: 0;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      float: right;
      margin-right: 0;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      padding: 20px;
      text-align: center;
      border-left: 1px solid #f5f5f5;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              padding: 0 10px;
              width: 220px;
              text-align: left;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  font-size: 12px;
                  color: #999;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: @xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: @priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
