// 封装购物车相关的API函数
import request from '@/utils/request';
import type { Cart } from '@/types/carts';

/* 获取商品最新价格库存 */
export const getNewCartGoods = (skuId: string) => {
  return request(`/goods/stock/${skuId}`, 'get');
};

/* 获取商品对应sku数据 */
export const getGoodsSku = (skuId: string) => {
  return request(`/goods/sku/${skuId}`, 'get');
};

/* 合并购物车 */
export const mergeCart = (cartList: Cart[]) => {
  return request('/member/cart/merge', 'post', cartList);
};

/* 获取购物车列表 */
export const findCart = () => {
  console.log('findCart');
  return request('/member/cart', 'get');
};

/* 加入购物车 */
export const insertCart = ({
  skuId,
  count
}: {
  skuId: string;
  count: number;
}) => {
  return request('/member/cart', 'post', { skuId, count });
};

/*  批量删除购物车 */
export const deleteCart = (ids: string[]) => {
  return request('/member/cart', 'delete', { ids });
};

/* 修改购物车商品 */
export const updateCart = ({
  skuId,
  selected,
  count
}: {
  skuId: string;
  selected: boolean;
  count: number;
}) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count });
};

/* 全选/反选 */
export const checkAllCart = ({
  selected,
  ids
}: {
  selected: boolean;
  ids: string[];
}) => {
  return request('/member/cart/selected', 'put', { selected, ids });
};
