import { TCategory } from "./category.type";
import { TProduct } from "./product.type";
import { TBlog } from "./blog.type";
import { TUser } from "./user.type";

export type TSignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TProductForm = Omit<
  TProduct,
  | "id"
  | "category"
  | "thumbnail"
  | "rating"
  | "sold"
  | "createdAt"
  | "updatedAt"
> & {
  category: string;
  thumbnail?: File;
};

export type TCategoryForm = Omit<TCategory, "id" | "createdAt" | "updatedAt">;

export type TBlogForm = Omit<TBlog, "id" | "views" | "createdAt" | "updatedAt">;

export type TUpdateProductParams = {
  id: string;
  product: TProductForm;
};

export type TUpdateCategoryParams = {
  id: string;
  category: TCategoryForm;
};

export type TUpdateBlogParams = {
  id: string;
  blog: TBlogForm;
};

export type TUpdateProfileForm = Omit<
  Partial<TUser>,
  "email" | "password" | "photoURL"
> & {
  photoURL?: File;
};
