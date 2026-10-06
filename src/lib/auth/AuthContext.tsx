"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  role: UserRole;
  status: "pending" | "active" | "suspended";
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  loginAsDemo: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const loginAsDemo = async (role: UserRole) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (role === "parent") {
          router.push("/portal/parent");
        } else if (role === "teacher") {
          router.push("/portal/teacher");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.error("Demo login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAsDemo, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
