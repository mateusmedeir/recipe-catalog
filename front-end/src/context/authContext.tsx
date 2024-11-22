"use client";

import api from "@/services/api";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/interfaces/user.interface";
import { ToastAction } from "@/components/ui/toast";
import { IAuthContext } from "@/interfaces/auth-context.interface";
import { createContext, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "accessToken";

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get("/users/me");

        setUser(response.data);
        if (pathname.includes("/login") || pathname.includes("/register"))
          router.push("/");
      } catch (error) {
        router.push("/login");
      }
    };
    loadUser();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      setUser(response.data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(response.data);
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Falha na autenticação",
        description: error.response.data.message,
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
        duration: 6000,
      });
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
      router.push("/login");
    } catch (error: any) {
      console.error(error);
    }
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
