import type { Address } from '@/types/member';

export interface RepurchaseOrder {
  userAddresses: Address[];
  goods: {
    id: string;
    name: string;
    picture: string;
    count: number;
    skuId: string;
    attrsText: string;
    price: number;
    payPrice: number; // 原单价
    totalPrice: number; // 小计价格
    totalPayPrice: number; // 实付价格
  }[];
  summary: {
    goodsCount: number;
    totalPrice: number;
    totalPayPrice: number;
    discountPrice: number;
    postFee: number;
  };
}
