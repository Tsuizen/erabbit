<template>
  <div class="cart">
    <!-- 购物车图标 -->
    <RouterLink to="/cart" class="curr">
      <i class="iconfont icon-cart"></i>
      <em>{{ cart.validTotal }}</em>
    </RouterLink>
    <div class="layer" v-if="cart.validTotal > 0 && $route.path !== '/cart'">
      <div class="list">
        <div class="item" v-for="goods in cart.validList" :key="goods.skuId">
          <RouterLink :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr allipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ goods.nowPrice }}</p>
              <p class="count">x{{ goods.count }}</p>
            </div>
          </RouterLink>
          <i
            @click="deleteCart(goods.skuId!)"
            class="iconfont icon-close-new"
          ></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共{{ cart.validTotal }}件商品</p>
          <p>&yen;{{ cart.validAmount }}</p>
        </div>
        <XtxButton @click="$router.push('/cart')" type="plain"
          >去购物车结算</XtxButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store';

const cart = useCartStore();
cart.findCart().then(() => {
  console.log('更新本地购物车成功');
});

const deleteCart = (skuId: string) => {
  cart.deleteCart(skuId);
};
</script>
<style scoped lang="less">
.cart {
  // 加下限制
  position: relative;
  z-index: 600;
  width: 50px;

  .curr {
    position: relative;
    display: block;
    height: 32px;
    text-align: center;
    line-height: 32px;

    .icon-cart {
      font-size: 22px;
    }

    em {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1px 6px;
      font-size: 12px;
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: Arial;
      color: #fff;
      background: @helpColor;
      border-radius: 10px;
      font-style: normal;
      line-height: 1;
    }
  }
  // 鼠标经过显示弹层
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
  // 弹层样式
  .layer {
    position: absolute;
    top: 50px;
    right: 0;
    padding-top: 10px;
    width: 400px;
    height: 400px;
    background: #fff;
    border-radius: 4px;
    opacity: 0;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);

    &::before {
      position: absolute;
      top: -10px;
      right: 14px;
      width: 20px;
      height: 20px;
      background: #fff;
      box-shadow: -3px -3px 5px rgb(0 0 0 / 10%);
      /* stylelint-disable-next-line string-quotes */
      content: '';
      transform: scale(0.6, 1) rotate(45deg);
    }

    .foot {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      width: 100%;
      height: 70px;
      background: #f8f8f8;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
      }
    }
  }

  .list {
    overflow: auto;
    padding: 0 10px;
    height: 310px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      position: relative;
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;

      i {
        position: absolute;
        right: 0;
        bottom: 38px;
        color: #666;
        opacity: 0;
        transition: all 0.5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          width: 80px;
          height: 80px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            padding-top: 5px;
            color: #999;
          }
        }

        .right {
          padding-right: 20px;
          width: 100px;
          text-align: center;

          .price {
            font-size: 16px;
            color: @priceColor;
          }

          .count {
            margin-top: 5px;
            font-size: 16px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
