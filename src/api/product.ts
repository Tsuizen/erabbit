import request from '@/utils/request';

/* 获取商品详情 */
export const findGoods = (id: string) => {
  return request('/goods', 'get', { id });
};

/* 获取相关推荐商品 */
export const findRelevantGoods = ({
  id,
  limit = 16
}: {
  id: string;
  limit?: number;
}) => {
  return request('/goods/relevant', 'get', { id, limit });
};
