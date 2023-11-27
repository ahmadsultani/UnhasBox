import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebase";

import { TSigninForm, TSignupForm } from "@/types/form.type";
import { TUser } from "@/types/user.type";

export const signup = async (values: TSignupForm) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );

  const user = {
    uid: userCredentials.user.uid,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    photo_url: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "user", user.uid), user);

  return user as TUser;
};

export const signin = async (values: TSigninForm) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );

  const docRef = doc(db, "user", userCredentials.user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TUser;
  } else {
    signOut(auth);
    throw new Error("User not found!");
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;

  if (user) {
    const docRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as TUser;
    } else {
      throw new Error("User not found!");
    }
  } else {
    throw new Error("User not found!");
  }
};
