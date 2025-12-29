"use client";
import { app } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useState, createContext, useEffect } from "react";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  userid?: string | null;
}

const auth = getAuth(app);
const firebasedb = getFirestore();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userid, setUserid] = useState<string | null>(null);

  const router = useRouter();

  const signup = async (email: string, password: string, username: string) => {
    try {
      const signedInuser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = signedInuser.user;
      console.log(user);

      await setDoc(doc(firebasedb, "users", user.uid), {
        username,
        email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("Error", error);
    }
  };
  const logout = async () => {
    await signOut(auth);
    router.push("/auth/signin");
  };

  const login = async (email: string, password: string) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    console.log(user);
    router.push("/dashboard");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        console.log("userUID", user.uid);
        setUserid(user.uid);
      } else {
        return;
      }
    });

    return () => unsubscribe();
  }, []);

  const isLoggedIn = currentUser ? true : false;

  return (
    <AuthContext.Provider value={{ login, signup, logout, isLoggedIn, userid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
