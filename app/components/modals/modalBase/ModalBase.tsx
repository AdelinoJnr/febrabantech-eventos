import React from "react";
import { IoClose } from "react-icons/io5";

type ModalBaseProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalBase({ isOpen, onClose, children }: ModalBaseProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IoClose />
        </button>
        <div>
          <h2 className="text-xl font-bold mt-4"></h2>
          <p className="mt-2 text-sm text-gray-600"></p>
        </div>
      </div>
    </div>
  );
}
