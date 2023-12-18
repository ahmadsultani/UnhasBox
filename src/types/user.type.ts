import { User } from "firebase/auth";

export enum ERole {
  ADMIN = "admin",
  USER = "user",
}

export type TUser = User & {
  id: string;
  firstName: string;
  lastName: string;
  role: ERole;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};
