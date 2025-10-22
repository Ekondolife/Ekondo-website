"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

type UserState = {
  uid: string | null;
  email?: string | null;
  displayName?: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const defaultState: UserState = { uid: null, email: null, displayName: null, loading: true, signOut: async () => {} };
const UserContext = createContext<UserState>(defaultState);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setUser({ uid: null, email: null, displayName: null, loading: false, signOut: async () => {} });
        return;
      }
      setUser({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        loading: false,
        signOut: async () => {
          await fbSignOut(auth);
        },
      });
    });
    return () => unsub();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
