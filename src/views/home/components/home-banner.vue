<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" auto-play />
  </div>
</template>

<script setup lang="ts">
import { findBanner } from '@/api/home';
import type { BannerResult } from '@/types/home';
import { ref } from 'vue';

const sliders = ref<BannerResult[]>([]);
findBanner().then((data) => {
  sliders.value = data.result;
});
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// .xtx-carousel {
//   :deep(.carousel-btn.prev) {
//     left: 270px;
//   }
//   :deep(.carousel-indicator) {
//     padding-left: 250px;
//   }
// }
.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
