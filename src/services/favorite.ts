import { db } from "@/config/firebase";
import {
  DocumentReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { TProduct } from "@/types/product.type";
import { TCategory } from "@/types/category.type";
import { TUser } from "@/types/user.type";

import Cookies from "js-cookie";

export const getAllFavoriteProduct = async () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  if (!user) return [];

  const q = query(collection(db, "favorite"), where("userId", "==", user.uid));

  const { docs } = await getDocs(q);

  const products: TProduct[] = [];

  const productPromises = docs.map(async (d) => {
    const favData = d.data();
    const productId = favData.productId;
    const productRef = doc(db, "product", productId);

    const productSnap = await getDoc(productRef);
    const productData = productSnap.data()!;

    const categoryRef = productData.category as DocumentReference;
    const categorySnap = await getDoc(categoryRef);
    const categoryData = categorySnap.data();

    const category = {
      ...categoryData,
      id: categorySnap.id,
    } as TCategory;

    const product = {
      ...productData,
      category,
      id: productSnap.id,
      isFavorite: true,
    } as TProduct;

    return product;
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const addToFavorite = async (productId: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  if (!user)
    throw new FirebaseError(
      "auth/user-not-authenticated",
      "You have to login first",
    );

  const favoriteRef = doc(db, "favorite", `${user.uid}_${productId}`);
  const isFavorite = await checkFavoriteExists(productId);

  if (isFavorite) {
    return;
  }

  const timestamp = serverTimestamp();

  await setDoc(
    favoriteRef,
    {
      userId: user.uid,
      productId,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    { merge: true },
  );
};

export const checkFavoriteExists = async (productId: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  if (!user) return false;

  const docRef = doc(db, "favorite", `${user.uid}_${productId}`);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.exists();
};

export const deleteFromFavorite = async (productTd: string) => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as TUser) : undefined;

  if (!user)
    throw new FirebaseError(
      "auth/user-not-authenticated",
      "You have to login first",
    );

  await deleteDoc(doc(db, "favorite", `${user.uid}_${productTd}`));
};
