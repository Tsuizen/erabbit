<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const checked = ref(false);
const changeChecked = () => {
  checked.value = !checked.value;
  // 使用emit通知父组件数据的改变
  emit('update:modelValue', checked.value);
};

// 使用侦听器
watch(
  () => props.modelValue,
  () => {
    checked.value = props.modelValue;
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
