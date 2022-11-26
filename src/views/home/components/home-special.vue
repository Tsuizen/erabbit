<template>
  <HomePanel title="最新专题">
    <template #right>
      <XtxMore />
    </template>
    <div ref="target" class="special-list">
      <div v-for="item in specailList" :key="item.id" class="special-item">
        <RouterLink to="/">
          <img v-lazy="item.cover" alt="" />
          <div class="meta">
            <p class="title">
              <span class="top ellipsis">{{ item.title }}</span>
              <span class="sub ellipsis">{{ item.summary }}</span>
            </p>
            <span class="price">&yen;{{ item.lowestPrice }}起</span>
          </div>
        </RouterLink>
        <div class="foot">
          <span class="like"
            ><i class="iconfont icon-hart1"></i>{{ item.collectNum }}</span
          >
          <span class="view"
            ><i class="iconfont icon-see"></i>{{ item.viewNum }}</span
          >
          <span class="replay"
            ><i class="iconfont icon-message"></i>{{ item.replayNum }}</span
          >
        </div>
      </div>
    </div>
  </HomePanel>
</template>

<script setup lang="ts">
import { findSpecial } from '@/api/home';
import XtxMore from '@/components/library/xtx-more.vue';
import { useLazyData } from '@/hooks';
import type { Special } from '@/types/home';
import type { Ref } from 'vue';
import HomePanel from './home-panel.vue';

const { target, result } = useLazyData(findSpecial);
const specailList: Ref<Special[]> = result;
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}

.special-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  height: 380px;

  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();

    a {
      position: relative;
      display: block;
      width: 100%;
      height: 288px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .meta {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 288px;
        background-image: linear-gradient(
          to top,
          rgb(0 0 0 / 80%),
          transparent 50%
        );

        .title {
          position: absolute;
          bottom: 0;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;

          .top {
            display: block;
            font-size: 22px;
            color: #fff;
          }

          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }

        .price {
          position: absolute;
          right: 16px;
          bottom: 25px;
          padding: 4px 8px 4px 7px;
          font-size: 17px;
          color: @priceColor;
          background-color: #fff;
          border-radius: 2px;
          line-height: 1;
        }
      }
    }

    .foot {
      padding: 0 20px;
      height: 72px;
      font-size: 16px;
      line-height: 72px;

      i {
        display: inline-block;
        margin-right: 5px;
        width: 15px;
        height: 14px;
        color: #999;
      }

      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }

      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>
