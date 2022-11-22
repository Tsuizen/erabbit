export interface Address {
  id?: string;
  receiver: string;
  contact: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  postalCode: string;
  addressTags: string;
  isDefault: number;
  fullLocation?: string;
}

