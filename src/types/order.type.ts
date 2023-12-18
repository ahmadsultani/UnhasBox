import { TProduct } from "./product.type";
import { TUser } from "./user.type";

export type TOrder = {
  id: string;
  user: TUser;
  products: {
    product: TProduct;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  totalProduct: number;
  createdAt: string;
  updatedAt: string;
  userId?: string;
};
