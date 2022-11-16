<template>
  <div class="xtx-number">
    <div class="label" v-if="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Number,
    default: 1
  },
  // 最小值 最大值
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits(['update:modelValue']);
// 绑定按钮点击事件
const count = ref(1);
const changeNum = (step: number) => {
  const newValue = count.value + step;
  if (newValue < props.min || newValue > props.max) {
    return;
  }
  count.value = newValue;
  emit('update:modelValue', newValue);
};
</script>

<style scoped lang="less"></style>
