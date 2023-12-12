import { auth, db } from "@/config/firebase";
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

import { TProduct } from "@/types/product.type";
import { TCategory } from "@/types/category.type";

export const getAllFavoriteProduct = async () => {
  const userId = auth.currentUser?.uid as string;

  const q = query(collection(db, "favorite"), where("userId", "==", userId));

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

export const addFavorite = async (productId: string) => {
  const userId = auth.currentUser?.uid as string;
  const favoriteRef = doc(db, "favorite", `${userId}_${productId}`);
  const isFavorite = await checkFavoriteExists(productId);

  if (isFavorite) {
    return;
  }

  await setDoc(
    favoriteRef,
    {
      userId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const checkFavoriteExists = async (productId: string) => {
  const userId = auth.currentUser?.uid as string;
  if (!userId) return false;
  const docRef = doc(db, "favorite", `${userId}_${productId}`);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.exists();
};

export const deleteFavorite = async (productTd: string) => {
  const userId = auth.currentUser?.uid as string;
  await deleteDoc(doc(db, "favorite", `${userId}_${productTd}`));
};
