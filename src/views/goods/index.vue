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
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" @change="changeSku"/>
          <!-- 数量选择组件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <!-- 按钮组件 -->
          <XtxButton
            type="primary"
            style="margin-top: 20px"
            @click="insertCart()"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24小时热榜+专题推荐 -->
        <div class="aside">
          <GoodsHot />
          <GoodsHot type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsImage from './components/goods-image.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import GoodsTabs from './components/goods-tabs.vue';
import GoodsHot from './components/goods-hot.vue';
import GoodsWarn from './components/goods-warn.vue';
import Message from '@/components/library/Message';
import type { GoodsResult } from '@/types/goods';
import type { SkuInfo } from './goods';
import { useGoods } from '@/hooks/index';
import { provide, ref, type Ref } from 'vue';
import { useCartStore } from '@/store';
import { storeToRefs } from 'pinia';

const goods: Ref<GoodsResult> = useGoods();
// 选择的数量
const num = ref(1);

const currSku = ref<SkuInfo>();

const changeSku = (sku: SkuInfo) => {
  // 修改商的现价原价信息
  if (sku.skuId) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventory;
  }
  currSku.value = sku;
};

// 提供goods数据给后代组件使用
provide('goods', goods);

const cartStore = useCartStore();
const { list } = storeToRefs(cartStore);

// 加入购物车
const insertCart = () => {
  console.log(currSku.value);
  
  if (currSku.value && currSku.value.skuId) {
    const { skuId, specsText: attrsText, inventory: stock } = currSku.value;
    const { id, name, price, mainPictures } = goods.value;

    cartStore.insertCart({
      skuId,
      attrsText,
      stock,
      id,
      name,
      price,
      nowPrice: +price,
      picture: mainPictures[0],
      selected: true,
      isEffective: true,
      count: num.value
    });
    Message({ type: 'success', text: '加入购物车成功' });
  } else {
    Message({ type: 'error', text: '请选择完整规格' });
  }
};
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
