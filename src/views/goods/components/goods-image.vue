<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 中图 -->
    <div ref="target" class="middle">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩色块 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img :src="img" alt="" @mouseenter="currIndex = i" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref, watch } from 'vue';

interface Props {
  images: string[];
}

defineProps<Props>();

const currIndex = ref(0);
// 图片放大

const target = ref(null);
// 是否显示遮罩和大图
const show = ref(false);
const layerPosition = reactive({
  left: '',
  top: ''
});
//大图背景定位
const largePosition = reactive({
  backgroundPositionX: '',
  backgroundPositionY: ''
});
// elementX鼠标基于容器左上角x轴偏移
// elementY鼠标基于容器左上角y轴偏移
// isOutside 鼠标是否在容器模板外
const { elementX, elementY, isOutside } = useMouseInElement(target);

watch([elementX, elementY, isOutside], () => {
  // 根据得到数据设置样式数据和是否显示数据
  show.value = !isOutside.value;

  const position = { x: 0, y: 0 };

  if (elementX.value < 100) {
    position.x = 0;
  } else if (elementX.value > 300) {
    position.x = 200;
  } else {
    position.x = elementX.value - 100;
  }

  if (elementY.value < 100) {
    position.y = 0;
  } else if (elementY.value > 300) {
    position.y = 200;
  } else {
    position.y = elementY.value - 100;
  }

  layerPosition.left = position.x + 'px';
  layerPosition.top = position.y + 'px';
  largePosition.backgroundPositionX = -2 * position.x + 'px';
  largePosition.backgroundPositionY = -2 * position.y + 'px';
});
</script>

<style scoped lang="less">
.goods-image {
  position: relative;
  z-index: 500;
  display: flex;
  width: 480px;
  height: 400px;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  }

  .middle {
    position: relative;
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    cursor: move;

    .layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background: rgb(0 0 0 / 20%);
    }
  }

  .small {
    width: 80px;

    li {
      margin-bottom: 15px;
      margin-left: 12px;
      width: 68px;
      height: 68px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
