<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in useList"
      :key="item.id"
      @mouseenter="show(item)"
      @mouseleave="hide(item)"
    >
      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">{{
        item.name
      }}</RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useCategoryStore } from '@/store';
import { storeToRefs } from 'pinia';
import type { Category } from '@/types/category';
import { computed, type ComputedRef } from 'vue';

const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);
const { show, hide } = categoryStore;

let useList: ComputedRef<Category[]> = computed(() => list.value as Category[]);
</script>

<style scoped lang="less">
.app-header-nav {
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  width: 820px;

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      display: inline-block;
      height: 32px;
      font-size: 16px;
      line-height: 32px;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // 显示二级类目
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
// 二级类名弹层
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }

  position: absolute;
  top: 56px;
  left: -200px;
  overflow: hidden;
  width: 1240px;
  height: 0;
  background-color: #fff;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;

  ul {
    display: flex;
    align-items: center;
    // justify-content: space-around;
    padding: 0 70px;
    height: 132px;
    flex-wrap: wrap;

    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }

      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
