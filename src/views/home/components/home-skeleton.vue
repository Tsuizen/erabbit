<template>
  <div class="home-skeleton">
    <div v-for="i in 4" :key="i" class="item" :style="{ backgroundColor: bg }">
      <XtxSkeleton
        bg="#e4e4e4"
        width="306px"
        height="306px"
        animated
      ></XtxSkeleton>
      <XtxSkeleton
        bg="#e4e4e4"
        width="160px"
        height="24px"
        animated
      ></XtxSkeleton>
      <XtxSkeleton
        bg="#e4e4e4"
        width="120px"
        height="24px"
        animated
      ></XtxSkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  bg: string;
}

withDefaults(defineProps<Props>(), {
  bg: '#fff'
});
</script>

<style scoped lang="less">
.home-skeleton {
  display: flex;
  justify-content: space-between;
  width: 1240px;
  height: 406px;

  .item {
    width: 306px;

    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
