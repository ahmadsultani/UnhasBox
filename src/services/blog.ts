import { db } from "@/config/firebase";
import { TBlogForm, TUpdateBlogParams } from "@/types/form.type";
import { TBlog } from "@/types/blog.type";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const getAllBlog = async () => {
  const querySnapshot = await getDocs(collection(db, "blog"));
  const blogs: TBlog[] = [];

  const blogPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data() as TBlog;
    return { ...data, id: doc.id };
  });

  const blogResults = await Promise.all(blogPromises);
  blogs.push(...blogResults);

  return blogs;
};

export const getOneBlog = async (id: string) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Blog not found!");
  }

  const data = docSnap.data() as TBlog;

  const blog: TBlog = { ...data, id: docRef.id };

  return blog;
};

export const createBlog = async (blog: TBlogForm) => {
  const timestamp = serverTimestamp();

  await addDoc(collection(db, "blog"), {
    ...blog,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
};

export const updateBlog = async ({ id, blog }: TUpdateBlogParams) => {
  const docRef = doc(db, "blog", id);
  const timestamp = serverTimestamp();

  await setDoc(docRef, {
    ...blog,
    updatedAt: timestamp,
  });
};

export const deleteOneBlog = async (id: string) => {
  const docRef = doc(db, "blog", id);

  await deleteDoc(docRef);
};
