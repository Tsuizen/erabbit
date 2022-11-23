<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <!-- 右上角插槽 -->
        <slot name="right" />
      </div>
      <!-- 默认插槽，面板内容 -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subTitle: string;
}
withDefaults(defineProps<Props>(), {
  title: '',
  subTitle: ''
});
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;

  .head {
    display: flex;
    align-items: flex-end;
    padding: 40px 0;

    h3 {
      margin-left: 6px;
      height: 35px;
      font-size: 32px;
      flex: 1;
      font-weight: normal;
      line-height: 35px;

      small {
        margin-left: 20px;
        font-size: 16px;
        color: #999;
      }
    }
  }
}
</style>
