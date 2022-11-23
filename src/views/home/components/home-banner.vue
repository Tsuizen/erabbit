<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" auto-play />
  </div>
</template>

<script setup lang="ts">
import { findBanner } from '@/api/home';
import type { Banner } from '@/types/home';
import { ref } from 'vue';

const sliders = ref<Banner[]>([]);
findBanner().then((data) => {
  sliders.value = data.result;
});
</script>

<style scoped lang="less">
.home-banner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  width: 1240px;
  height: 500px;
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
