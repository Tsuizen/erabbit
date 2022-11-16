import type { BrandResult } from './home';
import type { GoodsProps } from './home';

export interface CategoryResult {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
    picture?: string;
  }[];
  goods?: GoodsProps[];
  brands?: BrandResult[];
  open?: boolean;
}

export interface TopCategoryResult {
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

export interface SaleProperty {
  id: string;
  name: string;
  selectedProp: string;
  properties: {
    id: string;
    name: string;
  }[];
}

export interface FilterCategoryResult {
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

export interface TemporaryResult {
  counts: number;
  pageSize: number;
  pages: number;
  page: number;
  items: TemporaryItem[];
}
