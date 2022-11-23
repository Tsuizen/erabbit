<template>
  <div class="home-product" ref="target">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            v-for="sub in cate.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</RouterLink
          >
        </div>
        <XtxMore :path="`/category/${cate.id}`" />
      </template>
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-lazy="cate.picture" alt="" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script setup lang="ts">
import HomePanel from './home-panel.vue';
import HomeGoods from './home-goods.vue';
import { useLazyData } from '@/hooks';
import { findGoods } from '@/api/home';
import type { GoodsOfHome } from '@/types/home';
import type { Ref } from 'vue';

const { target, result } = useLazyData(findGoods);
const list: Ref<GoodsOfHome[]> = result;
</script>

<style scoped lang="less">
.home-product {
  height: 2900px;
  background: #fff;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        color: #fff;
        background: @xtxColor;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      position: relative;
      margin-right: 10px;
      width: 240px;
      height: 610px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        position: absolute;
        top: 50%;
        left: 0;
        display: flex;
        width: 188px;
        height: 66px;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgb(0 0 0 / 90%);
          }

          &:last-child {
            flex: 1;
            background: rgb(0 0 0 / 70%);
          }
        }
      }
    }

    .goods-list {
      display: flex;
      width: 990px;
      flex-wrap: wrap;

      li {
        margin-right: 10px;
        margin-bottom: 10px;
        width: 240px;
        height: 300px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
