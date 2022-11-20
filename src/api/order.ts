// 订单相关api

import request from '@/utils/request';

/* 结算页面-生成订单-根据购物车选中商品 */
const createOrder = () => {
  return request('/member/order/pre', 'get');
};

/* 结算页面-生成订单-根据订单中商品-再次购买 */
const repurchaseOrder = (orderId: string) => {
  return request('/member/order/repurchase/' + orderId, 'get');
};

/* 添加收货地址 */
const addAddress = (form: any) => {
  return request('/member/address', 'post', form);
};
