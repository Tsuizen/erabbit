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

/* 商品评价信息 */
export const findGoodsCommentInfo = (id: string) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios 遇见 http https 开头的地址，不会加上基准地址
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    'get'
  );
};

/* 商品评价列表 */
export const findGoodsCommentList = (id: string, params: any) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    'get',
    params
  );
};

/* 热销数据 */
export const findHotGoods = ({
  id,
  type,
  limit = 3
}: {
  id: string;
  type: string;
  limit: number;
}) => {
  return request('/goods/hot', 'get', { id, type, limit });
};
