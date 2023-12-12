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
    const data = doc.data();
    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();
    return { ...data, id: doc.id } as TBlog;
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

  const data = docSnap.data();

  data.createdAt = data.createdAt.toDate();
  data.updatedAt = data.updatedAt.toDate();

  const blog = { ...data, id: docRef.id } as TBlog;

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
