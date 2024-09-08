export interface CartItem {
  name: string;
  price: number;
  qty: number;
  thumbnail: string;
}

export interface ProductItem {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  addedQty?: number;
}

export interface WindowSize {
  width?: number;
  height?: number;
}

export type AddProductFn = (product: ProductItem, qty: number) => void;
export type RemoveProductFn = (product: CartItem, qty: number) => void;
