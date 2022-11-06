<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeCategory from '@/components/home-category.vue';
import { computed, reactive } from 'vue';
import { useCategoryStore } from '@/store';
import { storeToRefs } from 'pinia';
import type { CategoryResult } from '@/types';

const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-children', name: '品牌推荐' }]
});

const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);
const menuList = computed(() => {
  const tempList = list.value.map((item: CategoryResult) => {
    return {
      id: item.id,
      name: item.name,
      children: item.children && item.children.slice(0, 2)
    };
  });
});
</script>

<style scoped lang="less"></style>
