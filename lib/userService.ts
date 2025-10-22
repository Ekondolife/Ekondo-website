// lib/userService.ts
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export interface UserProfile {
  id: string;
  uid: string;
  email: string | null;
  fullName: string;
  phone: string;
  profileImage: string;
  createdAt?: any;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return { 
        id: uid,
        uid: uid,
        email: data.email || null,
        fullName: data.fullName || "",
        phone: data.phone || "",
        profileImage: data.profileImage || "",
        createdAt: data.createdAt
      };
    } else {
      console.warn("No such user found in Firestore!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function updateUserProfile(uid: string, data: { fullName?: string; phone?: string; profileImage?: string }) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}
