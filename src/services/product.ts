import { db } from "@/config/firebase";
import { TCategory } from "@/types/category.type";
import { TProductForm, TUpdateProductParams } from "@/types/form.type";
import { TProduct } from "@/types/product.type";
import { uploadAndGetImgUrl } from "@/utils/image";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const getAllProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  const products: TProduct[] = [];

  const productPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const categoryRef = doc.data().category as DocumentReference;
    const categorySnap = await getDoc(categoryRef);
    const categoryData = categorySnap.data() as TCategory;

    const category = {
      ...categoryData,
      id: categorySnap.id,
    };

    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();

    return { ...data, id: doc.id, category } as TProduct;
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

export const createProduct = async (product: TProductForm) => {
  const categoryRef = doc(db, "category", product.category);
  const timestamp = serverTimestamp();

  let thumbnail = "";

  if (product.thumbnail) {
    thumbnail = await uploadAndGetImgUrl(product.thumbnail, "product");
  }

  await addDoc(collection(db, "product"), {
    ...product,
    thumbnail,
    sold: 0,
    rating: 0,
    category: categoryRef,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateProduct = async ({ id, product }: TUpdateProductParams) => {
  const docRef = doc(db, "product", id);
  const categoryRef = doc(db, "category", product.category);
  const timestamp = serverTimestamp();

  await setDoc(docRef, {
    ...product,
    category: categoryRef,
    updatedAt: timestamp,
  });
};

export const deleteOneProduct = async (id: string) => {
  const docRef = doc(db, "product", id);

  await deleteDoc(docRef);
};
