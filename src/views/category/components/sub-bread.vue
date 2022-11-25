<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.name">{{
        category.sub.name
      }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store';
import { isCategoryResult } from '@/store/modules/category';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface CategoryTopAndSub {
  sub?: {
    id: string;
    name: string;
  };
  top?: {
    id: string;
    name: string;
  };
}

// 1.获取二级分类的ID，在地址路由中
const route = useRoute();

// 2.获取pinia中的类目数据
const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);

// 通过计算属性得到一级类目和二级类目的 ID & 名称
const category = computed<CategoryTopAndSub>(() => {
  const obj: CategoryTopAndSub = {};
  if (isCategoryResult(list.value)) {
    list.value.forEach((top) => {
      top.children &&
        top.children.forEach((sub) => {
          if (sub.id === route.params.id) {
            obj.sub = { id: sub.id, name: sub.name };
            obj.top = { id: top.id, name: top.name };
          }
        });
    });
  }
  return obj;
});
</script>
