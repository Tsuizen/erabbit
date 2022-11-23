<template>
  <button class="xtx-button ellipsis" :class="[size, type]">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'middle'
  },
  type: {
    type: String,
    default: 'default'
  }
});
</script>

<style scoped lang="less">
.xtx-button {
  text-align: center;
  background: #fff;
  border: none;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  appearance: none;
  cursor: pointer;
}

.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}

.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}

.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}

.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}

.default {
  color: #666;
  border-color: #e4e4e4;
}

.primary {
  color: #fff;
  background: @xtxColor;
  border-color: @xtxColor;
}

.plain {
  color: @xtxColor;
  /* stylelint-disable-next-line function-no-unknown */
  background: lighten(@xtxColor, 50%);
  border-color: @xtxColor;
}

.gray {
  color: #fff;
  background: #ccc;
  border-color: #ccc;
}
</style>
