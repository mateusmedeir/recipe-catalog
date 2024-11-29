"use client";

import api from "@/services/api";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/libs/interfaces/user.interface";
import { IAuthContext } from "@/libs/interfaces/auth-context.interface";
import { createContext, useContext, useEffect, useState } from "react";
import { RegisterData } from "@/libs/schemas/register.schema";
import { loginUser, logoutUser, registerUser } from "@/services/auth";
import { LoginData } from "@/libs/schemas/login.schema";

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get("/users/me");

        setUser(response.data);
        if (pathname.includes("/login") || pathname.includes("/cadastro"))
          router.push("/");
      } catch {
        if (!pathname.includes("/login") && !pathname.includes("/cadastro"))
          router.push("/login");
      }
    };
    loadUser();
  }, [pathname, router]);

  const register = async (data: RegisterData) => {
    const userData = await registerUser(data);
    setUser(userData);
    router.push("/");
  };

  const login = async (data: LoginData) => {
    const userData = await loginUser(data);
    setUser(userData);
    router.push("/");
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
