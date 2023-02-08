<template>
  <div class="goods-item">
    <RouterLink :to="`/product/${goods.id}`" class="image">
      <img v-lazy="goods.picture" alt="" />
    </RouterLink>
    <p class="name ellipsis-2">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现更多宝贝 &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GoodsProps } from '@/types/home';

defineProps<{
  goods: GoodsProps;
}>();
</script>

<style scoped lang="less">
.goods-item {
  position: relative;
  overflow: hidden;
  padding: 10px 30px;
  width: 240px;
  height: 300px;
  border: 1px solid transparent;
  transition: all 0.5s;

  .image {
    display: block;
    margin: 0 auto;
    width: 160px;
    height: 160px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    margin-top: 6px;
    font-size: 16px;

    &.name {
      height: 44px;
    }

    &.desc {
      height: 22px;
      color: #666;
    }

    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }

  .extra {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 86px;
    text-align: center;
    background: @xtxColor;
    transition: all 0.5s;
    transform: translate3d(0, 100%, 0);

    span {
      display: block;
      margin: 0 auto;
      width: 120px;
      color: #fff;
      line-height: 30px;

      &:first-child {
        margin-top: 5px;
        font-size: 18px;
        border-bottom: 1px solid #fff;
        line-height: 40px;
      }
    }
  }

  &:hover {
    border-color: @xtxColor;

    .extra {
      transform: none;
    }
  }
}
</style>
