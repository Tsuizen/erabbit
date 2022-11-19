<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox @change="checkAll" :moduleValue="cart.isCheckAll"
                  >全选</XtxCheckbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="cart.validList.length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="goods in cart.validList" :key="goods.skuId">
              <td>
                <XtxCheckbox
                  @change="($event: boolean) => checkOne(goods.skuId!, $event) "></XtxCheckbox>
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      @change="($event: any) => updateCartSku(goods.skuId!, $event)"
                      :sku-id="goods.skuId!"
                      :attrs-text="goods.attrsText!" />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price! - goods.nowPrice! > 0">
                  比加入时降价
                  <span class="red"
                    >&yen;{{ goods.price! - goods.nowPrice! }}</span
                  >
                </p>
              </td>
              <td class="tc">
                <XtxNumbox @change="$event=>updateCount"></XtxNumbox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store';
import CartNone from './components/cart-none.vue';
import CartSku from './components/cart-sku.vue';
const cart = useCartStore();

// 单选
const checkOne = (skuId: string, selected: boolean) => {
  cart.updateCart({ skuId, selected });
};
// 全选
const checkAll = (selected: boolean) => {
  cart.checkAllCart(selected);
};
// 删除
const deleteCart = (skuId: string) => {
  confirm
};

// 修改规格
const updateCartSku = (oldSkuId: string, newSku: any) => {
  cart.updateCartSku({ oldSkuId, newSku });
};
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
