import { db } from "@/config/firebase";
import { TCategory } from "@/types/category.type";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getAllCategory = async () => {
  const querySnapshot = await getDocs(collection(db, "category"));
  const categories: TCategory[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as TCategory;

    categories.push({ ...data });
  });

  return categories;
};

export const getOneCategory = async (id: string) => {
  const docRef = doc(db, "category", id);
  const docSnap = await getDoc(docRef);
  const category = docSnap.data() as TCategory;

  return { ...category, id: docRef.id };
};

export const createCategory = async () => {};
