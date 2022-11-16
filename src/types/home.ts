export interface GoodsProps {
  id: string;
  name: string;
  price: number;
  picture: string;
  desc: string;
}

export interface BrandResult {
  id: string;
  name: string;
  picture: string;
  nameEn: string;
  logo: string;
  type: string;
  desc: string;
  place: string;
}

export interface BannerResult {
  id: string;
  imgUrl: string;
  herfUrl: string;
  type: number;
}

export interface NewResult {
  id: string;
  picture: string;
  name: string;
  price: string;
  desc: string;
}

export interface GoodsResult {
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

export interface HotResult {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

export interface SpecialResult {
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
