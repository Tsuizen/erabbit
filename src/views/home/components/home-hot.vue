<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <div ref="target" style="position: relative; height: 426px">
        <!-- 面板内容 -->
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script setup lang="ts">
import { findHot } from '@/api/home';
import { useLazyData } from '@/hooks/index';
import type { Hot } from '@/types/home';
import type { Ref } from 'vue';
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';

const { target, result } = useLazyData(findHot);
const goods: Ref<Hot[]> = result;
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      padding-top: 12px;
      font-size: 22px;
      text-align: center;
    }

    .desc {
      font-size: 18px;
      color: #999;
    }
  }
}
</style>
