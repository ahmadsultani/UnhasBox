import { TCategory } from "./category.type";

export type TProduct = {
  id: string;
  name: string;
  description: string;
  category: TCategory;
  stock: number;
  sold: number;
  rating: number;
  price: number;
  thumbnail: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
};
