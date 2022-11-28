<template>
  <div class="order-info">
    <!-- 商品列表 -->
    <h3>订单商品</h3>
    <table class="goods-table">
      <thead>
        <tr>
          <th width="400">商品信息</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>实付</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.skus" :key="item.id">
          <td>
            <a href="javascript:;" class="product">
              <img :src="item.image" alt="" />
              <div class="info">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="attrs ellipsis">{{ item.attrsText }}</p>
              </div>
            </a>
          </td>
          <td>¥{{ item.curPrice }}</td>
          <td>{{ item.quantity }}</td>
          <td>¥{{ item.realPay }}</td>
          <td>¥{{ item.realPay }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types/order';

defineProps<{
  order: Order;
}>();
</script>

<style scoped lang="less">
.order-info {
  padding: 0 50px;

  h3 {
    padding: 25px 5px;
    font-size: 16px;
    font-weight: normal;
  }
}
// 商品表格
.goods-table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  th {
    font-weight: normal;
    line-height: 60px;
    background: #f5f5f5;

    &:first-child {
      padding-left: 20px;
      text-align: left;
    }
  }

  td {
    border-bottom: 1px solid #f5f5f5;
    text-align: center;

    &:first-child {
      padding-left: 20px;
      border-left: 1px solid #f5f5f5;
    }

    &:last-child {
      border-right: 1px solid #f5f5f5;
    }
  }

  .product {
    display: flex;
    padding: 20px 0;

    img {
      width: 70px;
      height: 70px;
      border: 1px solid #f5f5f5;
    }

    .info {
      align-self: center;
      padding-left: 20px;
      text-align: left;

      p {
        margin-bottom: 5px;
        width: 280px;
      }

      .attrs {
        color: #999;
      }
    }
  }
}
// 信息盒子
.info-box {
  padding: 20px;
  border: 1px solid #f5f5f5;

  dl {
    display: flex;
    line-height: 30px;

    dt {
      width: 80px;
      font-size: 14px;
      color: #999;

      i {
        display: inline-block;
        width: 0.5em;
      }
    }

    dd {
      flex: 1;
    }
  }
}
// 汇总信息
.sum-info {
  overflow: hidden;
  padding: 30px 30px 100px;

  .info {
    float: right;
    width: 250px;
    height: 160px;
    font-size: 16px;

    .item {
      line-height: 40px;
      display: flex;

      label {
        width: 90px;

        i {
          display: inline-block;
          width: 2em;
        }
      }

      span {
        padding-right: 30px;
        text-align: right;
        flex: 1;

        &.price {
          font-size: 20px;
          color: @priceColor;
        }
      }
    }
  }
}
</style>
