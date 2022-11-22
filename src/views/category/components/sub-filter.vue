<template>
  <!-- 晒选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(item.id)"
          href="javascript:;"
          :class="{
            active: item.id === filterData.selectedBrand
          }"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          v-for="attr in item.properties"
          href="javascript:;"
          :class="{ acitve: item.selectedProp === attr.id }"
          :key="attr.id"
          @click="changeProp(item, attr.id)">
          {{ attr.name }}
        </a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
  </div>
</template>

<script setup lang="ts">
//1.获取数据
//2.数据中需要全部选中，需要预览将来点击激活功能，默认选中全部

import { findSubCategoryFilter } from '@/api/category';
import type { FilterCategory, SaleProperty } from '@/types/category';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['filter-change']);

//3.完成渲染
const route = useRoute();
const filterData = ref<FilterCategory | null>(null);
const filterLoading = ref<boolean>(false);

//4.分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
watch(
  () => route.params.id,
  (newVal) => {
    // 变化后的id有值，且处在二级类目路由下
    if (newVal && route.path === '/category/sub/' + newVal) {
      filterLoading.value = true;
      // 发送请求数据
      findSubCategoryFilter(route.params.id as string).then((data) => {
        // 每一组可选的筛选条件缺失 全部 条件，处理下数据加上全部
        // 给每一组数据加上一个选中的ID
        // 1.品牌
        const result: FilterCategory = data.result;
        result.selectedBrand = '';
        result.brands.unshift({ id: '', name: '全部' });
        // 2.销售属性
        result.saleProperties.forEach((item) => {
          item.selectedProp = '';
          item.properties.unshift({ id: '', name: '全部' });
        });
        filterData.value = result;
        filterLoading.value = false;
      });
    }
  },
  { immediate: true }
);

const getFilterParams = () => {
  const obj: {
    brandId: string | null;
    attrs: { groupName: string; propertyName: string }[];
  } = {
    brandId: null,
    attrs: []
  };
  //品牌
  obj.brandId = filterData.value!.selectedBrand;
  //销售属性
  filterData.value?.saleProperties.forEach((item) => {
    if (item.selectedProp) {
      const prop = item.properties.find(
        (prop) => prop.id === item.selectedProp
      );
      obj.attrs.push({ groupName: item.name, propertyName: prop!.name });
    }
  });
  if (obj.attrs.length === 0) {
    obj.attrs === null;
  }
  return obj;
};

const changeBrand = (brandId: string) => {
  if (filterData.value?.selectedBrand === brandId) {
    return;
  }
  filterData.value!.selectedBrand = brandId;
  emit('filter-change', getFilterParams);
};

const changeProp = (item: SaleProperty, propId: string) => {
  if (item.selectedProp === propId) {
    return;
  }
  item.selectedProp = propId;
  emit('filter-change', getFilterParams);
};
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background-color: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &.hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
