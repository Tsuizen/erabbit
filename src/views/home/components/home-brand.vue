<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        @click="toggle(-1)"
      ></a>
      <a
        href="javascript:;"
        class="iconfont icon-angle-right next"
        @click="toggle(1)"
      ></a>
    </template>
    <div ref="target" class="box">
      <Transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" z />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton
            v-for="i in 5"
            :key="i"
            class="item"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup lang="ts">
import { findBrand } from '@/api/home';
import { useLazyData } from '@/hooks';
import type { Brand } from '@/types/home';
import { ref, type Ref } from 'vue';
import HomePanel from './home-panel.vue';

const { target, result } = useLazyData(() => findBrand(10));
const brands: Ref<Brand[]> = result;
const index = ref(0);
const toggle = (step: number) => {
  const newIndex = index.value + step;
  if (newIndex < 0 || newIndex > 1) {
    return;
  }
  index.value = newIndex;
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}

.iconfont {
  display: inline-block;
  margin-left: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
  background: #ccc;
  background: @xtxColor;

  &::before {
    position: relative;
    top: -2px;
    font-size: 12px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  overflow: hidden;
  padding-bottom: 40px;
  width: 100%;
  height: 345px;

  .list {
    display: flex;
    width: 200%;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  display: flex;
  width: 100%;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
