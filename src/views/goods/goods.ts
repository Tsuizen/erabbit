export interface SkuInfo {
  skuId: string;
  price: string;
  oldPrice: string;
  inventory: number;
  // 属性名：属性值 属性名1：属性值1 ... 这样的字符串
  specsText: string;
}
