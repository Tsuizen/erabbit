<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        v-for="url in pictures"
        :key="url"
        :class="{ active: currImg === url }"
        href="javascript:;"
        @click="currImg = url"
      >
        <img :src="url" alt="" />
      </a>
    </div>
    <div v-if="currImg" class="preview">
      <img :src="currImg" alt="" />
      <i class="iconfont icon-close-new" @click="currImg = ''"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  pictures: string[];
}>();

const currImg = ref<string>('');
</script>

<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    a {
      margin-right: 20px;
      margin-bottom: 10px;
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      &.active {
        border-color: @xtxColor;
      }
    }
  }
}

.preview {
  position: relative;
  margin-bottom: 20px;
  width: 480px;
  height: 480px;
  background: #f8f8f8;
  border: 1px solid #e4e4e4;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  i {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    color: #fff;
    background: rgb(0 0 0 / 20%);
    line-height: 30px;
  }
}
</style>
