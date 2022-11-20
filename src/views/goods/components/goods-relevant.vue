<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <XtxCarousel :sliders="sliders" ref="target" />
  </div>
</template>

<script setup lang="ts">
import { findRelevantGoods } from '@/api/product';
import type { Banner } from '@/types/home';
import { ref } from 'vue';

const props = defineProps({
  goodsId: {
    type: String,
    default: ''
  }
});

// 最终需要sliders给轮播图使用
// 数据结构：sliders = [[4个],[4个],[4个],[4个]]
const sliders = ref<Banner[]>([]);

findRelevantGoods({ id: props.goodsId }).then((data) => {
  const pageSize = 4;
  const pageCount = Math.ceil(data.result.length / pageSize);
  for (let i = 0; i < pageCount; i++) {
    sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)));
  }
  // console.log(sliders.value);
});
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}

// 深度选择器，用于vue中突破scoped导致的组件样式私有化限制
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
