import request from '@/utils/request';

/* 获取首页头部分类数据 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get');
};

/* 获取单个顶级分类 */
export const findTopCategory = (id: string) => {
  return request('/category', 'get', { id });
};

/* 获取二级分类筛选条件数据 */
export const findSubCategoryFilter = (id: string) => {
  return request('/category/sub/filter', 'get', { id });
};

/* 获取分类下的商品 */
export const findSubCategroyGoods = (params: any) => {
  return request('/category/goods/temporary', 'post', params);
};
