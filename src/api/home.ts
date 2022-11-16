import request from '@/utils/request';

export const findBrand = (nums: number = 6): Promise<any> => {
  return request('/home/brand', 'get', { nums });
};

export const findBanner = () => {
  return request('/home/banner', 'get');
};

export const findNew = () => {
  return request('/home/new', 'get');
};

export const findHot = () => {
  return request('/home/hot', 'get');
};

export const findGoods = () => {
  return request('/home/goods', 'get');
};

export const findSpecial = () => {
  return request('/home/special', 'get');
};
