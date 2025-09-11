import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./modalPalestrantes.module.scss";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppCompany } from "@/providers/AppCompanyProvider";

type ModalPalestrantesProps = {
  isOpen: boolean;
  onClose: () => void;
  image_url: string;
  speaker_name: string;
  pseudonym: string;
  mini_bio: string;
  mini_bio_en: string;
  agenda: { talk_start_date: Date }[];
};



export default function ModalPalestrantes({
  isOpen,
  onClose,
  image_url,
  speaker_name,
  pseudonym,
  mini_bio,
  mini_bio_en,
  agenda,
}: ModalPalestrantesProps) {
  const { translate } = useTranslation();
  const { themas } = useAppCompany();

  const diasAgenda = Array.from(
    new Set(
      agenda.map(a => {
        const date = new Date(a.talk_start_date);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        return `${dia}/${mes}`;
      })
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-pointer" onClick={onClose}>
      <div
        className="relative bg-white rounded-sm shadow-[0_10px_15px_rgba(0,0,0,0.3)] max-w-[900px] min-h-[600px] w-full mx-[32px] cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`${styles.closeButton} absolute top-3 right-3 text-gray-700 bg-transparent border-0 cursor-pointer`}
        >
          <IoCloseCircleOutline size={24} />
        </button>

        <div className="flex flex-row gap-6">
          <div className={styles.sidebar}>
            <div className="flex flex-col">
              <img
                className="w-[144px] h-[144px] rounded-sm object-cover"
                src={image_url || "./app/assets/images/user_placeholder.png"}
                alt={speaker_name}
              />
              <h5 style={{ 'color': themas?.corSecundaria }} className="line-clamp-2 mt-2">{pseudonym || speaker_name}</h5>
              <p>{ 'Desenvolvedor asda hjabdah ahbdhasb ahsbdhabsdhjbadha shbdjhassbdjas ' }</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="agenda">
                <span>📅</span> { diasAgenda.join('; ') }
              </div>
              <button className="mt-3 text-sm bg-transparent border-0 cursor-pointer hover:underline" style={{ 'color': themas?.corSecundaria }}>ver na agenda</button>
            </div>
          </div>

          <div className="pt-[40px] pb-[20px] pe-[40px] w-full text-[16px] text-[#111111] leading-relaxed">
            { translate(mini_bio, mini_bio_en) }
          </div>
        </div>
      </div>
    </div>
  );
}
