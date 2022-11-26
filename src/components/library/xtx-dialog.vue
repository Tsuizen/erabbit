<template>
  <div v-show="visible" class="xtx-dialog" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="javascript:;"
          class="iconfont icon-font-new"
          @click="closeDialog()"
        ></a>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:visible']);

const fade = ref(false);

watch(
  () => props.visible,
  (newVal) => {
    // 结构和样式同时加上无过度效果，需要些延时。
    setTimeout(() => {
      fade.value = newVal;
    }, 0);
  },
  { immediate: true }
);

const closeDialog = () => {
  emits('update:visible', false);
};
</script>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8887;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 0%);

  &.fade {
    background: rgb(0 0 0 / 50%);
    transition: all 0.4s;
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    background: #fff;
    border-radius: 4px;
    opacity: 0;
    transform: translate(-50%, -60%);

    &.fade {
      opacity: 1;
      transition: all 0.4s;
      transform: translate(-50%, -50%);
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        margin-right: 3px;
        font-size: 16px;
        color: @priceColor;
      }
    }

    .footer {
      padding: 10px 0 30px;
      text-align: center;
    }

    .header {
      position: relative;
      padding: 0 20px;
      height: 70px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        top: 25px;
        right: 25px;
        width: 20px;
        height: 20px;
        font-size: 24px;
        text-align: center;
        color: #999;
        line-height: 20px;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
