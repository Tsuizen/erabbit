<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" auto-play />

      <!-- 二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>-{{ sub.name }}-</h3>
          <!-- <p class="tag">温暖柔软，品质之选</p> -->
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findBanner } from '@/api/home';
import { findTopCategory } from '@/api/category';
import { useCategoryStore } from '@/store';
import type { Category } from '@/types/category';
import { storeToRefs } from 'pinia';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue';

// 轮播图
const sliders = ref([]);
findBanner().then((data) => {
  sliders.value = data.result;
});

//面包屑+所有子分类
const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);
const route = useRoute();

const topCategory: ComputedRef<Category> = computed(() => {
  let cate: Category = {
    id: '',
    name: '',
    children: []
  };
  let listValue = list.value as Category[];
  //当前顶级分类
  const item = listValue.find((item) => {
    return item.id === route.params.id;
  });
  if (item) {
    cate = item;
  }
  return cate;
});

//获取各个子目录下推荐商品
const subList: Ref<Category[]> = ref([]);
const getSubList = () => {
  findTopCategory(route.params.id as string).then((data) => {
    subList.value = data.result.children;
  });
};

watch(
  () => route.params.id,
  (newVal) => {
    // newVal && getSubList() 加上一个严谨判断，在顶级类名下才发请求
    if (newVal && `/category/${newVal}` === route.path) {
      getSubList();
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
