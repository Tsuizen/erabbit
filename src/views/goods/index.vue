<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑组件 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24小时热榜+专题推荐 -->
        <div class="aside"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsImage from './components/goods-image.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import { useGoods } from '@/hooks/index';
import type { GoodsResult } from '@/types/goods';
import type { Ref } from 'vue';

const goods: Ref<GoodsResult> = useGoods();
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
