export interface GoodsProps {
  id: string;
  name: string;
  price: number;
  picture: string;
  desc?: string;
}

/* 品牌 */
export interface Brand {
  id: string;
  name: string;
  picture: string;
  nameEn: string;
  logo: string;
  type: string;
  desc: string;
  place: string;
}

/* 轮播图 */
export interface Banner {
  id: string;
  imgUrl: string;
  herfUrl: string;
  type: number;
}

// 新品
export interface New {
  id: string;
  picture: string;
  name: string;
  price: string;
  desc: string;
}

/* 首页货物类型 */
export interface GoodsOfHome {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: {
    id: string;
    name: string;
  }[];
  goods: GoodsProps[];
}

/* 热卖 */
export interface Hot {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

/* 最新专题 */
export interface Special {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replayNum: number;
}
