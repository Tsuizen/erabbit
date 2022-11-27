import type { Address } from '@/types/member';

interface Sku {
  id: string;
  spuId: string;
  name: string;
  quantity: number;
  image: string;
  realPay: number;
  curPrice: number;
  totalNumber: number | null;
  properties: {
    propertyMainName: string;
    propertyValueName: string;
  };
  attrsText: string;
}

export interface Order {
  id: string;
  createTime: string;
  payType: number;
  orderState: number;
  payLatestTime: string;
  countdown: number;
  postFee: number;
  payMoney: number;
  payChannel: number;
  payState: number;
  totalMoney: number;
  totalNum: number;
  deliveryTimeType: number;
  receiverContact: string;
  receiverMobile: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  receiverAddress: string;
  payTime: string | null;
  consignTime: string | null;
  endTime: string | null;
  closeTime: string | null;
  evaluationTime: string | null;
  skus: Sku[];
  arrivalEstimatedTime: string | null;
}

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

export interface Logistics {
  picture: string;
  count: number;
  company: {
    name: string;
    number: string;
    tel: number;
  };
  list: {
    id: string;
    text: string;
    time: string;
  }[];
}
