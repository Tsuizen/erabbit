<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc'
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc'
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const emit = defineEmits(['sort-change']);

interface SortType {
  inventory: false;
  onlyDiscount: false;
  sortField: null | string;
  sortMethod: null | string;
}

const sortParams: SortType = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null
});

// 绑定按钮的点击事件修改排序字段和排序方式
const changeSort = (sortField: string | null) => {
  if (sortField === 'price') {
    sortParams.sortField = sortField;
    if (sortParams.sortMethod === null) {
      // 第一次点击，默认是降序
      sortParams.sortMethod = 'desc';
    } else {
      // 其他情况根据当前情况取反
      sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc';
    }
  } else {
    // 如果排序未改变停止逻辑
    if (sortParams.sortField === sortField) {
      return;
    }
    sortParams.sortField = sortField;
    sortParams.sortMethod = null;
  }
  emit('sort-change', sortParams);
};

watch(
  () => [sortParams.inventory, sortParams.onlyDiscount],
  () => {
    emit('sort-change', sortParams);
  }
);
</script>

<style scoped lang="less">
.sub-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  .sort {
    display: flex;

    a {
      position: relative;
      padding: 0 20px;
      margin-right: 20px;
      height: 30px;
      color: #999;
      border: 1px solid #e4e4e4;
      border-radius: 2px;
      transition: all 0.3s;
      line-height: 28px;

      &.active {
        color: #fff;
        background: @xtxColor;
        border-color: @xtxColor;
      }

      .arrow {
        position: absolute;
        right: 8px;
        border: 5px solid transparent;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
