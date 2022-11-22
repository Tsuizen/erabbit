interface Brand {
  id: string;
  name: string;
  brand: string;
  nameEn: string;
  picture?: string;
  logo?: string;
  type?: string;
  desc?: string;
  place?: string;
}

interface Category {
  id: string;
  name: string;
  layer: number;
  parent: {
    id: string;
    name: string;
    layer: number;
    parent?: string;
  };
}

interface SimilarProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: number;
  orderNum: number;
}

interface EvaluationInfo {
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
}

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

/* Sku需要更新的值 */
export interface SkuInfo {
  skuId: string;
  price: number;
  oldPrice: string;
  inventory: number;
  // 属性名：属性值 属性名1：属性值1 ... 这样的字符串
  specsText: string;
}

/* 接收到的商品sku */
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
  price: number;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: Brand;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: string[];
  videoScale: number;
  mainPictures: string[];
  specs: GoodsSpecs[];
  skus: GoodsSku[];
  categories: Category[];
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
  similarProducts: SimilarProduct[];
  hotByDay: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount?: number;
    orderNum: number;
  }[];
  evaluationInfo?: EvaluationInfo;
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
