<template>
  <div class="home-category" @mouseleave="categoryId = ''">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        :class="{ active: categoryId === item.id }"
        @mouseenter="categoryId = item.id"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            {{ sub.name }}
          </RouterLink>
        </template>
        <span v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255, 255, 255, 0.2)"
          />
          <XtxSkeleton
            width="50px"
            height="18px"
            bg="rgba(255, 255, 255,0.2)"
          />
        </span>
      </li>
    </ul>
    <div class="layer">
      <h4>分类推荐<small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory?.goods?.length">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price">{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="currCategory && currCategory.brands">
        <li v-for="brand in currCategory.brands" :key="brand.id" class="brand">
          <RouterLink to="/">
            <img :src="brand.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findBrand } from '@/api/home';
import { useCategoryStore } from '@/store';
import { isCategoryResult } from '@/store/modules/category';
import type { Category } from '@/types/category';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const brand = reactive({
  id: 'brand',
  name: '品牌 ',
  children: [{ id: 'brand-children', name: '品牌推荐' }],
  brands: []
});

const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);

const menuList = computed<Category[]>(() => {
  let tempList: Category[] = [];
  if (isCategoryResult(list.value)) {
    tempList = list.value.map((item: Category) => {
      return {
        id: item.id,
        name: item.name,
        // 防止初始化没有children的时候调用slice报错
        children: item.children && item.children.slice(0, 2),
        goods: item.goods
      };
    });
    tempList.push(brand);
  }
  return tempList;
});

//得到弹出层商品数据
const categoryId = ref('');
const currCategory = computed(() => {
  return menuList.value?.find((item) => item.id === categoryId.value);
});

findBrand(6).then((data) => {
  brand.brands = data.result;
});
</script>

<style scoped lang="less">
.home-category {
  position: relative;
  z-index: 99;
  width: 250px;
  height: 500px;
  background: rgb(0 0 0 / 80%);

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover,
      &.active {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    position: absolute;
    top: 0;
    left: 250px;
    display: none;
    padding: 0 15px;
    width: 990px;
    height: 500px;
    background: rgb(255 255 255 / 80%);

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 15px;
        margin-bottom: 15px;
        width: 310px;
        height: 120px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 4px;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          align-items: center;
          padding: 10px;
          width: 100%;
          height: 100%;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  &:hover {
    .layer {
      display: block;
    }
  }
}

.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.2;
  }

  to {
    opacity: 1;
  }
}
</style>
