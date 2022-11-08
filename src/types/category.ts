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
