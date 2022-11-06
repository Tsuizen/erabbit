<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
  <main class="app-body">
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>

<script setup lang="ts">
import AppTopnav from '@/components/app-topnav.vue';
import AppHeader from '@/components/app-header.vue';
import AppHeaderSticky from '@/components/app-header-sticky.vue';
import AppFooter from '@/components/app-footer.vue';
import { useCategoryStore } from '@/store';

const categoryStore = useCategoryStore();
const { getList } = categoryStore;
getList();
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
