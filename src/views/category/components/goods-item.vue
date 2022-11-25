<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <img :src="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
import type { GoodsProps } from '@/types/home';
defineProps<{
  goods: GoodsProps;
}>();
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  padding: 20px 30px;
  width: 220px;
  text-align: center;
  .hoverShadow();

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    height: 29px;
    color: #999;
  }

  .price {
    font-size: 20px;
    color: @priceColor;
  }
}
</style>
