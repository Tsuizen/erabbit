<template>
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<script setup lang="ts">
interface Props {
  path: string;
}

withDefaults(defineProps<Props>(), {
  path: '/'
});
</script>

<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;

  span {
    margin-right: 4px;
    font-size: 16px;
    color: #999;
    vertical-align: middle;
  }

  i {
    position: relative;
    top: 2px;
    font-size: 14px;
    color: #ccc;
    vertical-align: middle;
  }

  &:hover {
    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>
