<template>
  <div ref="container" class="xtx-infinite-loading">
    <div v-if="loading" class="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div v-if="finished" class="none">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['infinite']);

const container = ref(null);
useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (props.loading === false && props.finished === false) {
        emit('infinite');
      }
    }
  },
  {
    threshold: 0
  }
);
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      /* stylelint-disable-next-line function-url-quotes */
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      font-size: 16px;
      color: #999;
    }
  }

  .none {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      /* stylelint-disable-next-line function-url-quotes */
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }

    .text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
