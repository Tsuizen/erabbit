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
                <XtxCheckbox v-model="isCheckAll" @change="checkAll"
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
                  v-model="goods.selected"
                  @change="($event: boolean) => checkOne(goods.skuId!, $event)"
                />
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
                      :sku-id="goods.skuId!"
                      :attrs-text="goods.attrsText!"
                      @change="($event) => updateCartSku(goods.skuId!, $event)"
                    />
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
                <XtxNumbox
                  :max="goods.stock"
                  :model-value="goods.count"
                  @change="($event: number) => updateCount(goods.skuId!, $event)"
                />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{
                    (Math.round(goods.nowPrice! * 100) * goods.count!) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(goods.skuId!)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="cart.invalidList">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="goods in cart.invalidList" :key="goods.skuId">
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>
                  &yen;{{
                    (Math.round(goods.nowPrice! * 100) * goods.count!) / 100
                  }}}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(goods.skuId!)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox v-model="isCheckAll" @change="checkAll"
            >全选</XtxCheckbox
          >
          <a href="javascript:;" @click="batchDeleteCart(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ cart.validTotal }} 件商品，已选择
          {{ cart.selectedTotal }} 件，商品合计：
          <span class="red">¥{{ cart.selectedAmount }}</span>
          <XtxButton type="primary" @click="checkout">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>

<script setup lang="ts">
import Confirm from '@/components/library/Confirm';
import Message from '@/components/library/Message';
import { useCartStore, useUserStore } from '@/store';
import type { SkuInfo } from '@/types/goods';
import GoodRelevant from '@/views/goods/components/goods-relevant.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CartNone from './components/cart-none.vue';
import CartSku from './components/cart-sku.vue';

const cart = useCartStore();
const user = useUserStore();

// 单选
const checkOne = (skuId: string, selected: boolean) => {
  cart.updateCart({ skuId, selected });
};

const isCheckAll = ref(cart.isCheckAll);

// 全选
const checkAll = (selected: boolean) => {
  cart.checkAllCart(selected);
};

// 删除
const deleteCart = (skuId: string) => {
  Confirm({ text: '亲，您是否确认删除商品' })
    .then(() => {
      cart.deleteCart(skuId).then(() => {
        Message({ type: 'success', text: '删除成功' });
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

// 批量删除选中商品，也支持清空无效商品
const batchDeleteCart = (isClear: boolean) => {
  Confirm({
    text: `亲，您是否确认删除${isClear ? '失效' : '选中'}的商品`
  }).then(() => {
    cart.batchDeleteCart(isClear);
  });
};

// 修改数量
const updateCount = (skuId: string, count: number) => {
  cart.updateCart({ skuId, count });
};

// 修改规格
const updateCartSku = (oldSkuId: string, newSku: SkuInfo) => {
  cart.updateCartSku({ oldSkuId, newSku });
};

// 结算
const router = useRouter();
const checkout = () => {
  // 1.判断是否选中商品，且提示
  // 2.弹出框确认，提示：下单结算需要登录
  // 3.使用导航守卫，遇见需要登录的路由跳转，拦截到登录页面
  if (cart.selectedList.length === 0) {
    return Message({ text: '至少选中一种商品' });
  }

  // 如果登录直接跳转
  if (user.profile.token) {
    return router.push('/member/checkout');
  }

  // 未登录弹出确认框
  Confirm({ text: '下单结算需要登录，确认现在去登录吗？' })
    .then(() => {
      router.push('/member/checkout');
    })
    .catch((e) => {
      console.log(e);
    });
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
    padding-left: 10px;
    width: 280px;
    font-size: 16px;

    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}

.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  margin-top: 20px;
  height: 80px;
  font-size: 16px;
  background: #fff;

  .xtx-checkbox {
    color: #999;
  }

  .batch {
    a {
      margin-left: 20px;
    }
  }

  .red {
    margin-right: 20px;
    font-size: 18px;
    font-weight: bold;
  }
}

.tit {
  font-size: 16px;
  color: #666;
  font-weight: normal;
  line-height: 50px;
}

.xtx-cart-page {
  .cart {
    color: #666;
    background: #fff;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          padding-left: 30px;
          text-align: left;
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
