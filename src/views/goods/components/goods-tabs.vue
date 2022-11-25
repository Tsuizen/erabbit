<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetail'"
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
        >商品评价<span>{{ goods?.commentCount }}</span
        >></a
      >
    </nav>
    <!-- 切换内容的地方 其实两个组件-->
    <!-- 在vue中动态的去切换组件其实可以使用动态组件component组件 -->
    <!-- is属性用来决定component动态组件渲染为那个组件，组件的名称 -->
    <KeepAlive>
      <GoodsDetail v-if="activeName === 'GoodsDetail'" />
      <GoodsComment v-else />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import type { Goods } from '@/types/goods';
import { inject, ref } from 'vue';
import GoodsDetail from './goods-detail.vue';
import GoodsComment from './goods-comment.vue';
const activeName = ref<string>('GoodsDetail');
const goods = inject<Goods>('goods');
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    display: flex;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;

    a {
      position: relative;
      padding: 0 40px;
      font-size: 18px;

      > span {
        margin-left: 10px;
        font-size: 16px;
        color: @priceColor;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          position: absolute;
          bottom: -1px;
          left: 40px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
          /* stylelint-disable-next-line string-quotes */
          content: '';
        }
      }
    }
  }
}
</style>
