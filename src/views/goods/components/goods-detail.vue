<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="item in goods?.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in goods?.details.pictures"
      :key="item"
      alt=""
      :src="item"
    />
  </div>
</template>

<script setup lang="ts">
import type { Goods } from '@/types/goods';
import { inject, type Ref } from 'vue';
const test  =() => {}
const goods = inject<Ref<Goods>>('goods');
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>
