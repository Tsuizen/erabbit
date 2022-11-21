// 订单相关api

import type { Address } from '@/types/member';
import request from '@/utils/request';

/* 订单提交参数 */
export interface Params {
  goods: {
    skuId: string;
    count: number;
  }[];
  addressId: string;
  // 配送时间类型，1为不限，2为工作日，3为双休或假日
  deliveryTimeType: number;
  payType: number;
  payChannel: number;
  buyerMessage: string;
}

/* 结算页面-生成订单-根据购物车选中商品 */
export const createOrder = () => {
  return request('/member/order/pre', 'get');
};

/* 结算页面-生成订单-根据订单中商品-再次购买 */
export const repurchaseOrder = (orderId: string) => {
  return request('/member/order/repurchase/' + orderId, 'get');
};

/* 添加收货地址 */
export const addAddress = (form: Address) => {
  return request('/member/address', 'post', form);
};

/* 修改收货地址 */
export const editAddress = (form: Address) => {
  return request(`/member/address/${form.id}`, 'put', form);
};

/* 结算页面提交订单 */
export const submitOrder = (params: Params) => {
  return request('/member/order', 'post', params);
};

/* 获取订单详情 */
export const findOrderDetail = (orderId: string) => {
  return request('/member/order/' + orderId, 'get');
};

/* 获取订单列表 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState });
};

/* 取消订单 */
export const cancelOrder = ({
  orderId,
  cancelReason
}: {
  orderId: string;
  cancelReason: string;
}) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason });
};

/* 删除订单 */
export const deleteOrder = (orderId: string) => {
  return request('/member/order', 'delete', { ids: [orderId] });
};

/* 确认收货 */
export const confirmOrder = (orderId: string) => {
  return request(`/member/order/${orderId}/receipt`, 'put');
};

/* 查询物流 */
export const logisticsOrder = (orderId: string) => {
  return request(`/member/order/${orderId}/logistics`, 'get');
};
