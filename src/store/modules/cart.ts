import type { CartResult } from '@/types/carts';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const cartStore = defineStore(
  'cart',
  () => {
    // 购物车列表
    const list = ref<CartResult[]>([]);
    // 有效商品列表库存大于0，商品有效标识符为true
    const validList = computed<CartResult[]>(() =>
      list.value.filter((goods) => goods.stock && goods.isEffective)
    );
    // 有效商品总件数
    const validTotal = computed<number>(() =>
      validList.value.reduce((p, c) => p + c.count, 0)
    );
    // 有效商品总金额
    const validAmount = computed<number>(
      () =>
        validList.value.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
    );
    // 无效商品列表
    const invalidList = computed<CartResult[]>(() =>
      list.value.filter((goods) => goods.stock <= 0 || !goods.isEffective)
    );
    // 已选商品列表
    const selectedList = computed<CartResult[]>(() =>
      validList.value.filter((goods) => goods.selected)
    );
    // 已选商品总件数
    const selectedTotal = computed<number>(() =>
      selectedList.value.reduce((p, c) => p + c.count, 0)
    );
    // 已选商品总金额
    const selectedAmount = computed<number>(() => {
      return (
        selectedList.value.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      );
    });
    // 是否全选
    const isCheckAll = computed(() => {
      validList.value.length !== 0 &&
        selectedList.value.length === validList.value.length;
    });

    const insertCart = (cart: CartResult) => {
      // 约定加入购物车字段必须和后端保持一致 payload对象 的字段
      // 它们是：id skuId name attrsText picture price nowPrice selected stock count isEffective
      // 插入数据规则：
      // 1. 先找下是否有相同商品
      // 2. 如果有相同的商品，查询它的数量，累加到payload上，再保存最新位置，原来商品需要删除
      // 3. 如果没有相同商品，保存在最新位置即可
      const sameIndex = list.value.findIndex(
        (goods) => goods.skuId === cart.skuId
      );
      if (sameIndex > -1) {
        const count = list.value[sameIndex].count;
        cart.count += count;
        // 删除原来的
        list.value.splice(sameIndex, 1);
      }
      list.value.unshift(cart);
    };
    return {
      list,
      validList,
      validTotal,
      validAmount,
      invalidList,
      selectedAmount,
      selectedList,
      selectedTotal,
      isCheckAll,
      insertCart
    };
  },
  {
    persist: true
  }
);

export default cartStore;
