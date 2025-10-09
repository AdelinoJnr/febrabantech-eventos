import { ModalBaseProps } from "@/@types/propsComponents";
import { useAppCompany } from "@/providers/AppCompanyProvider";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router";

export default function ModalBase({ isOpen, onClose, title, content, button, isHtml, img }: ModalBaseProps) {
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-white w-[400px] max-w-[90%] h-[600px] rounded-[8px] shadow-lg flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Titulo - NÃO obrigatorio */}
          <h3
            style={{ 'color': themas?.corSecundaria }}
            className="text-lg font-bold text-center flex-1 text-[20px] line-clamp-2"
          >{title}</h3>

          {/* Close modal */}
          <button
            className="ml-4 p-2 rounded-full hover:text-[#444] text-[#000] transition cursor-pointer"
            onClick={onClose}
          >
            <IoCloseCircleOutline size={30} />
          </button>
        </div>

        {/* Imagem - NÃO obrigatorio */}
        { img &&
            <div className="p-3">
              <img src={img} alt='image' />
            </div>
        }
        

        {/* Conteúdo (HTML ou String) */}
        <div className="p-4 flex-1 overflow-y-auto text-[#000]">
          {isHtml && typeof content === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>

        {/* Botão inferior (Redirecionamento externo ou interno) - NÃO obrigatorio*/}
        <div className="px-4 py-3 flex justify-end m-auto">
          {button && button.label && (
            button.href ? (
              button.href.startsWith("http") ? (
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                >
                  {button.label}
                </a>
              ) : (
                <Link
                  to={button.href}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                >
                  {button.label}
                </Link>
              )
            ) : (
              <button
                onClick={button.onClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
              >
                {button.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
