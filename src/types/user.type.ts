import { User } from "firebase/auth";

export type TUser = User & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo_url: string;
  createdAt: string;
  updatedAt: string;
};
