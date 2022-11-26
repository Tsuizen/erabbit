<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { findHotGoods } from '@/api/product';
import type { GoodsProps } from '@/types/home';
import GoodsItem from '@/views/category/components/goods-item.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  type: {
    type: String,
    default: '1'
  }
});

const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' };
const title = computed<string>(() => titleObj[props.type]);

const route = useRoute();
// 商品列表
const goodsList = ref<GoodsProps[]>([]);
findHotGoods({
  id: route.params.id as string,
  type: props.type,
  limit: 3
}).then((data) => {
  goodsList.value = data.result;
});
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    padding-left: 25px;
    margin-bottom: 10px;
    height: 70px;
    font-size: 18px;
    color: #fff;
    background: @helpColor;
    line-height: 70px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    margin-bottom: 10px;
    width: 100%;
    background: #fff;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
