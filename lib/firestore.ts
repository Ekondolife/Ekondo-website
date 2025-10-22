import { db } from "./firebaseClient";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const createUserProfile = async (uid: string, email: string, name?: string) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    email,
    name: name || "",
    createdAt: serverTimestamp(),
  });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) return snapshot.data();
  return null;
};
