import { createContext, ReactNode, useContext, useState } from "react";

interface CacheState {
  sobre?: any;
  trilhas?: any;
}

interface CacheContextType {
  cache: CacheState;
  setCache: (data: Partial<CacheState>) => void;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCacheState] = useState<CacheState>({});

  const setCache = (data: Partial<CacheState>) => {
    setCacheState(prev => ({ ...prev, ...data }));
  };

  return (
    <CacheContext.Provider value={{ cache, setCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) throw new Error("'useCache' CacheProvider");
  return context;
};
