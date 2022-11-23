<template>
  <div class="home-panel">
    <div class="header">
      <h4>{{ title }}</h4>
      <XtxMore to="/" />
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="less">
.home-panel {
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 18px 0;
    height: 66px;
    border-bottom: 1px solid #f5f5f5;

    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>
