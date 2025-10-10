import { AuthContextType, IUser } from "@/@types/authProvider";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        console.warn("Erro ao parsear user do localStorage");
      }
    }
  }, []);

  const login = (data: IUser) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const tokenAuth = (authorization: string) => {
    setToken(authorization);
    localStorage.setItem("token", token);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, tokenAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("'useCache' CacheProvider");
  return context;
};