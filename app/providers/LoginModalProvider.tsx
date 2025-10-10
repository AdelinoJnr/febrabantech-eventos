import { createContext, useContext, useState } from "react";

type LoginModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const ctx = useContext(LoginModalContext);
  if (!ctx) throw new Error("useLoginModal deve ser usado dentro de LoginModalProvider");
  return ctx;
};