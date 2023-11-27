import { db } from "@/config/firebase";
import { TCategory } from "@/types/category.type";
import { TProduct } from "@/types/product.type";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const getAllProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  const products: TProduct[] = [];

  const productPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data() as TProduct;
    const categoryRef = doc.data().category as DocumentReference;
    const categorySnap = await getDoc(categoryRef);
    const categoryData = categorySnap.data() as TCategory;

    const category = {
      ...categoryData,
      id: categorySnap.id,
    };

    return { ...data, id: doc.id, category };
  });

  const productResults = await Promise.all(productPromises);
  products.push(...productResults);

  return products;
};

export const getOneProduct = async (id: string) => {
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Product not found!");
  }

  const data = docSnap.data() as TProduct;

  const categoryRef = docSnap.data().category as DocumentReference;
  const categorySnap = await getDoc(categoryRef);

  if (!categorySnap.exists()) {
    throw new Error("Category not found!");
  }

  const category = categorySnap.data() as TCategory;

  const product: TProduct = { ...data, id: docRef.id, category };

  return product;
};
