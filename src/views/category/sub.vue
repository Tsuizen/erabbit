<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!--筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"></GoodsItem>
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemporaryItem, Temporary } from '@/types/category';
import { findSubCategroyGoods } from '@/api/category';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
import SubSort from './components/sub-sort.vue';
import GoodsItem from './components/goods-item.vue';

interface ReqParams {
  page: number;
  pageSize: number;
  categoryId: string;
}

const route = useRoute();
// 加载中
const loading = ref<boolean>(false);
// 是否加载完毕
const finished = ref<boolean>(false);
// 商品列表数据
const goodsList = ref<TemporaryItem[]>([]);
// 请求参数
let reqParams: ReqParams = {
  page: 1,
  pageSize: 20,
  categoryId: ''
};
const getData = () => {
  loading.value = true;
  // 设置二级分类id
  reqParams.categoryId = route.params.id as string;
  findSubCategroyGoods(reqParams).then(
    ({ result }: { result: Temporary }) => {
      // 获取数据成功
      if (result.items.length) {
        // 有数据就追加数据
        goodsList.value.push(...result.items);
        // 把page改成下一页页码
        reqParams.page++;
      } else {
        // 没有数据，代表加载完
        finished.value = true;
      }
      loading.value = false;
    }
  );

  // 在更改了二级分类的时候要重新加载数据
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false;
        goodsList.value = []; // 导致列表为空，进入可视区域，加载更多数据
        reqParams = {
          page: 1,
          pageSize: 20,
          categoryId: ''
        };
      }
    }
  );
};

// 1.更改排序组件的筛选数据，重新请求
const sortChange = (sortParams: ReqParams) => {
  finished.value = false;
  // 合并请求参
  reqParams = { ...reqParams, ...sortParams };
  reqParams.page = 1;
  goodsList.value = [];
};

// 2.更改筛选组件的筛选数据，重新请求
const filterChange = (filterParams: ReqParams) => {
  finished.value = false;
  reqParams = { ...reqParams, ...filterParams };
  reqParams.page = 1;
  goodsList.value = [];
};
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
