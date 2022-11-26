<template>
  <div class="xtx-numbox">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="count" />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
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

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    padding-left: 10px;
    width: 60px;
    color: #999;
  }

  .numbox {
    display: flex;
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;

    > a {
      width: 29px;
      font-size: 16px;
      text-align: center;
      color: #666;
      background: #f8f8f8;
      line-height: 28px;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      padding: 0 5px;
      width: 60px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
