<template>
  <div v-if="goods" class="xtx-goods-page">
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
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XtxNumbox v-model="num" label="数量" :max="goods.inventory" />
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
      <GoodsRelevant :goods-id="goods.id" />
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
import Message from '@/components/library/Message';
import { useGoods } from '@/hooks/index';
import { useCartStore } from '@/store';
import type { Goods, SkuInfo } from '@/types/goods';
import { provide, ref, type Ref } from 'vue';
import GoodsHot from './components/goods-hot.vue';
import GoodsImage from './components/goods-image.vue';
import GoodsName from './components/goods-name.vue';
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsSku from './components/goods-sku.vue';
import GoodsTabs from './components/goods-tabs.vue';
import GoodsWarn from './components/goods-warn.vue';
// import { storeToRefs } from 'pinia';

const goods: Ref<Goods> = useGoods();
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
// const { list } = storeToRefs(cartStore);

// 加入购物车
const insertCart = () => {
  if (currSku.value && currSku.value.skuId) {
    const { skuId, specsText: attrsText, inventory: stock } = currSku.value;
    const { id, name, price, mainPictures } = goods.value;

    cartStore
      .insertCart({
        skuId,
        attrsText,
        stock,
        id,
        name,
        price,
        nowPrice: price,
        picture: mainPictures[0],
        selected: true,
        isEffective: true,
        count: num.value
      })
      .then(() => {
        Message({ type: 'success', text: '加入购物车成功' });
      });
  } else {
    Message({ type: 'error', text: '请选择完整规格' });
  }
};
</script>

<style scoped lang="less">
.goods-info {
  display: flex;
  min-height: 600px;
  background: #fff;

  .media {
    padding: 30px 50px;
    width: 580px;
    height: 600px;
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
    margin-right: 20px;
    width: 940px;
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
  margin-top: 20px;
  min-height: 600px;
  background: #fff;
}
</style>
