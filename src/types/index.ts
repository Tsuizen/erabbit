export interface CategoryResult {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
    picture: string;
    goods: {
      id: string;
      name: string;
      desc: string;
      price: string;
      picture: string;
    }[];
  }[];
  open?: boolean;
}

export interface CategoryInfo {
  msg: string;
  result: CategoryResult[];
}
