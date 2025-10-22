import { auth, db } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  phone?: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      fullName,
      phone: phone || "",
      profileImage: "", // Always use default avatar
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

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create user document if it doesn't exist
      await setDoc(userRef, {
        email: user.email,
        fullName: user.displayName || "",
        phone: "",
        profileImage: "", // We'll use default avatar
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}
