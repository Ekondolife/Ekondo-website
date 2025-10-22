import { auth, db } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  phone?: string,
  profileImage?: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      fullName,
      phone: phone || "",
      profileImage: profileImage && profileImage.trim() !== "" 
        ? profileImage 
        : "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName) + "&background=random",
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
