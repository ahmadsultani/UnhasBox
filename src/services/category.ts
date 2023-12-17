import { db } from "@/config/firebase";
import { TCategory } from "@/types/category.type";
import { TCategoryForm, TUpdateCategoryParams } from "@/types/form.type";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const getAllCategory = async () => {
  const querySnapshot = await getDocs(collection(db, "category"));
  const categories: TCategory[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const category = {
      ...data,
      id: doc.id,
      createdAt: data?.createdAt.toDate(),
      updatedAt: data?.updatedAt.toDate(),
    } as TCategory;

    categories.push(category);
  });

  return categories;
};

export const getOneCategory = async (id: string) => {
  const docRef = doc(db, "category", id);
  const docSnap = await getDoc(docRef);
  const categoryData = docSnap.data();

  const category = {
    ...categoryData,
    createdAt: categoryData?.createdAt.toDate(),
    updatedAt: categoryData?.updatedAt.toDate(),
  };

  return { ...category, id: docRef.id } as TCategory;
};

export const createCategory = async (category: TCategoryForm) => {
  const timestamp = serverTimestamp();

  await addDoc(collection(db, "category"), {
    ...category,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateCategory = async ({
  id,
  category,
}: TUpdateCategoryParams) => {
  const docRef = doc(db, "category", id);
  const timestamp = serverTimestamp();

  await updateDoc(docRef, {
    ...category,
    updatedAt: timestamp,
  });
};

export const deleteOneCategory = async (id: string) => {
  const docRef = doc(db, "category", id);

  await deleteDoc(docRef);
};
