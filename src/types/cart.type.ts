import { TProduct } from "./product.type";

export interface TCart {
  id: string;
  product: TProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type TCartForm = Omit<
  TCart,
  "id" | "product" | "createdAt" | "updatedAt"
> & {
  productId: string;
  quantity: number;
};

export type TCartResponse = {
  cart: TCart[];
  totalPrice: number;
  totalSum: number;
};
