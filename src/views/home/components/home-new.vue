<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <div style="position: relative; height: 406px" ref="target">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script setup lang="ts">
import { findNew } from '@/api/home';
import type { Ref } from 'vue';
import type { New } from '@/types/home';
import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { useLazyData } from '@/hooks/index';

const { target, result } = useLazyData(findNew);

const goods: Ref<New[]> = result;
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      padding: 12px 30px 0;
      font-size: 22px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
