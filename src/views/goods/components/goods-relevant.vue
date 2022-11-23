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
});
</script>

<style scoped lang="less">
.goods-relevant {
  margin-top: 20px;
  min-height: 460px;
  background: #fff;

  .header {
    padding: 0 20px;
    height: 80px;
    line-height: 80px;

    .title {
      padding-left: 10px;
      font-size: 20px;
    }

    .icon {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      transform: rotate(45deg);

      &::before {
        position: absolute;
        top: 2px;
        left: 0;
        width: 10px;
        height: 10px;
        background: lighten(@xtxColor, 40%);
        content: '';
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
      color: #ddd;
      background: rgb(0 0 0 / 0%);
      opacity: 1;

      i {
        font-size: 30px;
      }
    }
  }
}
</style>
