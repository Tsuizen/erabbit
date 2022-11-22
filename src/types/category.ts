import type { Brand } from './home';
import type { GoodsProps } from './home';

/* 商品类别 */
export interface Category {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
    picture?: string;
  }[];
  goods?: GoodsProps[];
  brands?: Brand[];
  open?: boolean;
}

/* 一级分类列表 */
export interface TopCategory {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
    picture: string;
  }[];
  goods: {
    id: string;
    picture: string;
    name: string;
    price: string;
    desc: string;
    discount: string;
  }[];
}

/* 销售属性集合 */
export interface SaleProperty {
  id: string;
  name: string;
  selectedProp: string;
  properties: {
    id: string;
    name: string;
  }[];
}

/* 分类筛选 */
export interface FilterCategory {
  categories: {
    id: string;
    name: string;
  }[];
  brands: {
    id: string;
    name: string;
    nameEn?: string;
    logo?: string;
  }[];
  saleProperties: SaleProperty[];
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  selectedBrand: string;
}

/* 临时商品 */
export interface TemporaryItem {
  id: string;
  picture: string;
  name: string;
  price: number;
  desc: string;
  discount: number;
  joinCount: number;
  oldPrice: number;
}

/* 临时商品列表 */
export interface Temporary {
  counts: number;
  pageSize: number;
  pages: number;
  page: number;
  items: TemporaryItem[];
}
