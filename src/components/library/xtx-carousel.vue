<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 图片容器 -->
    <ul class="carousel-body">
      <!-- fade 显示的图片加上 -->
      <li
        v-for="(item, i) in sliders"
        :key="i"
        class="carousel-item"
        :class="{ fade: index === i }"
      >
        <!-- 图片 -->
        <RouterLink v-if="(item as Banner).imgUrl" to="/">
          <img :src="(item as Banner).imgUrl" alt="" />
        </RouterLink>
        <!-- 商品列表 item=[goods1,goods2,。。。]-->
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item as Relevant[]"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活点 -->
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Relevant } from '@/types/goods';
import type { Banner } from '@/types/home';
import { onUnmounted, ref, watch } from 'vue';

interface Props {
  sliders: Banner[] | Relevant[][];
  duration: number;
  autoPlay: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sliders: () => [],
  duration: 3000,
  autoPlay: false
});

// 默认显示的图片索引
const index = ref(0);

let timer: number | undefined;

// 自动播放
const autoPlayFn = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    index.value++;
    if (index.value >= props.sliders.length) {
      index.value = 0;
    }
  }, props.duration);
};

// 鼠标进入暂停，离开开始自动播放
const stop = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFn();
  }
};

// 图片切换
const toggle = (step: number) => {
  const newIndex = index.value + step;
  if (newIndex >= props.sliders.length) {
    index.value = 0;
    return;
  }
  if (newIndex < 0) {
    index.value = props.sliders.length - 1;
    return;
  }
  index.value = newIndex;
};

watch(
  () => props.sliders,
  (newVal) => {
    if (newVal.length && props.autoPlay) {
      autoPlayFn();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="less">
.xtx-carousel {
  position: relative;
  width: 100%;
  min-width: 300px;
  height: 100%;
  min-height: 150px;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        z-index: 1;
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgb(0 0 0 / 20%);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      position: absolute;
      top: 228px;
      z-index: 2;
      width: 44px;
      height: 44px;
      text-align: center;
      color: #fff;
      background: rgb(0 0 0 / 20%);
      border-radius: 50%;
      opacity: 0;
      transition: all 0.5s;
      line-height: 44px;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;

  > a {
    width: 240px;
    text-align: center;

    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }

    .name {
      padding: 0 40px;
      font-size: 16px;
      color: #666;
    }

    .price {
      margin-top: 15px;
      font-size: 16px;
      color: @priceColor;
    }
  }
}
</style>
