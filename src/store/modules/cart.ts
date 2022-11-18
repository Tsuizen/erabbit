import type { CartResult } from '@/types/carts';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  mergeCart as mergeCartApi,
  deleteCart as deleteCartApi,
  insertCart as insertCartApi,
  findCart as findCartApi,
  checkAllCart as checkAllCartApi,
  updateCart as updateCartApi,
  getNewCartGoods
} from '@/api/cart';
import userStore from './user';

const user = userStore();

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
      validList.value.reduce((p, c) => p + c.count!, 0)
    );
    // 有效商品总金额
    const validAmount = computed<number>(
      () =>
        validList.value.reduce(
          (p, c) => p + Math.round(c.nowPrice! * 100) * c.count!,
          0
        ) / 100
    );
    // 无效商品列表
    const invalidList = computed<CartResult[]>(() =>
      list.value.filter((goods) => goods.stock! <= 0 || !goods.isEffective)
    );
    // 已选商品列表
    const selectedList = computed<CartResult[]>(() =>
      validList.value.filter((goods) => goods.selected)
    );
    // 已选商品总件数
    const selectedTotal = computed<number>(() =>
      selectedList.value.reduce((p, c) => p + c.count!, 0)
    );
    // 已选商品总金额
    const selectedAmount = computed<number>(() => {
      return (
        selectedList.value.reduce(
          (p, c) => p + Math.round(c.nowPrice! * 100) * c.count!,
          0
        ) / 100
      );
    });
    // 是否全选
    const isCheckAll = computed(() => {
      validList.value.length !== 0 &&
        selectedList.value.length === validList.value.length;
    });

    const insertCartNotLogin = (cart: CartResult) => {
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
        cart.count! += count!;
        // 删除原来的
        list.value.splice(sameIndex, 1);
      }
      list.value.unshift(cart);
    };
    // 设置购物车
    const setCartNotLogin = (cartList: CartResult[]) => {
      list.value = cartList;
    };
    // 更新购物车
    const updateCartNotLogin = (goods: any) => {
      // goods 商品信息nowPrice, stock, isEffective
      // goods 商品对象的字段不固定，对象中有哪些字段就改哪些字段
      // 商品对象必须有skuid
      const updateGoods = list.value.find((item) => item.skuId === goods.skuId);
      for (const key in goods) {
        if (goods[key] && goods[key]) {
          updateGoods![key] = goods[key];
        }
      }
    };
    // 删除购物车
    const deleteCartNotLogin = (skuId: string) => {
      const index = list.value.findIndex((item) => item.skuId === skuId);
      list.value.splice(index, 1);
    };
    // 合并购物车
    const mergeCart = async () => {
      const cartList = list.value.map((goods) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        };
      });
      await mergeCartApi(cartList);
      // 合并成功，清空本地购物车
      setCartNotLogin([]);
    };
    // 修改规格
    const updateCartSku = ({
      oldSkuId,
      newSku
    }: {
      oldSkuId: string;
      newSku: any;
    }) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          // 已登录
          // 找出旧的商品数据
          // 删除旧的商品数据
          // 原先商品的数量+新skuid
          // 添加新的商品
          const oldGoods = list.value.find((item) => item.skuId === oldSkuId);
          deleteCartApi([oldGoods?.skuId!])
            .then(() => {
              return insertCartApi({
                skuId: newSku.skuId,
                count: oldGoods?.count as number
              });
            })
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        } else {
          // 未登录
          // 1. 找出旧的商品信息
          // 2. 删除旧商品数据
          // 3. 根据新的sku信息和旧的商品信息，合并成一条新的购物车商品数据
          // 4. 添加新的商品
          const oldGoods = list.value.find((item) => item.skuId === oldSkuId);
          deleteCartNotLogin(oldSkuId);
          const {
            skuId,
            price: nowPrice,
            specsText: attrsText,
            inventory: stock
          } = newSku;
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock };
          insertCartNotLogin(newGoods);
          resolve();
        }
      });
    };

    // 批量删除
    const batchDeleteCart = (isClear: boolean) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          // 已登录
          const ids = (isClear ? invalidList : selectedList).value.map(
            (item) => item.skuId
          ) as string[];
          deleteCartApi(ids)
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        } else {
          // 未登录
          (isClear ? invalidList : selectedList).value.forEach((item) => {
            deleteCartNotLogin(item.skuId!);
          });
        }
      });
    };

    const checkAllCart = (selected: boolean) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          // 已登录
          const ids = validList.value.map((item) => item.skuId) as string[];
          checkAllCartApi({ selected, ids })
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        } else {
          // 未登录
          validList.value.forEach((goods) => {
            updateCartNotLogin({ skuId: goods.skuId, selected });
          });
          resolve();
        }
      });
    };
    // 修改购物车（选中状态，数量）
    const updateCart = (payload: any) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          updateCartApi(payload)
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        } else {
          updateCartNotLogin(payload);
          resolve();
        }
      });
    };

    const deleteCart = (payload: any) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          deleteCartApi([payload])
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        } else {
          deleteCartNotLogin(payload);
          resolve();
        }
      });
    };

    const insertCart = (payload: any) => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          insertCartApi({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return findCartApi();
            })
            .then((data) => {
              setCartNotLogin(data.result);
              resolve();
            });
        }
        {
          insertCart(payload);
          resolve();
        }
      });
    };

    // 获取商品列表
    const findCart = () => {
      return new Promise<void>((resolve, reject) => {
        if (user.profile.token) {
          findCartApi().then((data) => {
            setCartNotLogin(data.result);
            resolve();
          });
        } else {
          // 未登录
          // 同时发送请求（有几个商品发几个请求）等所有请求成功，一并去修改本地数据。
          // Promise.all(promise数组).then((dataList)=>{})  同时发请求，所有请求成功，得到所有成功结果
          // Promise.resolve() Promise.reject() new Promise()
          // Promise.race(promise数组).then((data)=>{}) 同时发请求，最快的请求成功，得到成功结果
          const promiseArr = list.value.map((goods) => {
            return getNewCartGoods(goods.skuId!);
          });
          // dataList成功结果的集合，数据顺序和promiseArr顺序一致，它又是根据state.list而来
          Promise.all(promiseArr).then((dataList) => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              updateCartNotLogin({
                skuId: list.value[i].skuId,
                ...data.result
              });
            });
            // 调用resolve代表操作成功
            resolve();
          });
        }
      });
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
      insertCart,
      mergeCart,
      updateCart,
      updateCartSku,
      batchDeleteCart,
      findCart,
      deleteCart,
      checkAllCart
    };
  },
  {
    persist: true
  }
);

export default cartStore;
