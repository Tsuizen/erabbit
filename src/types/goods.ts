/* 用户地址 */
export interface UserAddress {
  id: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  isDefault: number;
  fullLocation: string;
}

/* 商品sku */
export interface GoodsSku {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  picture: string;
  specs: {
    name: string;
    valueName: string;
  }[];
}

/* 商品spec */
export interface GoodsSpecs {
  name: string;
  id: string;
  values: SpecsValues[];
}

export interface SpecsValues {
  name: string;
  picture: string;
  available?: boolean;
  desc: string;
  selected: boolean;
  disabled: boolean;
}

/* 商品 */
export interface Goods {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: {
    id: string;
    name: string;
    brand: string;
    nameEn: string;
    picture?: string;
    logo?: string;
    type?: string;
    desc?: string;
    place?: string;
  };
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: string[];
  videoScale: number;
  mainPictures: string[];
  specs: GoodsSpecs[];
  skus: GoodsSku[];
  categories: {
    id: string;
    name: string;
    layer: number;
    parent: {
      id: string;
      name: string;
      layer: number;
      parent?: string;
    };
  }[];
  details: {
    pictures: string[];
    properties: {
      name: string;
      value: string;
    }[];
  };
  isPreSale: boolean;
  isCollect?: boolean;
  recommands?: string;
  userAddresses?: UserAddress[];
  similarProducts: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount?: number;
    orderNum: number;
  }[];
  hotByDay: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount?: number;
    orderNum: number;
  }[];
  evaluationInfo?: {
    orderInfo: {
      specs: {
        name: string;
        valueName: string;
      }[];
      quantity: string;
      createTime: string;
    };
    member: {
      id: string;
      nickname: string;
      avatar: string;
    };
    score: number;
    content: string;
    pictures: string;
    createTime: string;
    praisePercent: number;
  };
}

/* 相关推荐 */
export interface Relevant {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount: number | null;
  orderNum: number;
}
