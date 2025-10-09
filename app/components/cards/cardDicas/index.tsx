import React, { useState } from 'react'
import { CardDicasProps } from '@/@types/propsComponents'
import { FaMapLocationDot, FaBed, FaNetworkWired, FaMicrophone, FaBriefcaseMedical, FaWifi } from "react-icons/fa6";
import { FaParking, FaArchive, FaQuestionCircle } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { useAppCompany } from '@/providers/AppCompanyProvider';
import ModalBase from '@/components/modals/modalBase/ModalBase';

const iconMap = {
  FaMapLocationDot,
  FaBed,
  FaNetworkWired,
  FaMicrophone,
  FaParking,
  FaBriefcaseMedical,
  FaArchive,
  FaQuestionCircle,
  IoFastFood,
  FaWifi,
};

export default function CardDicas({ icon, titleCard, image_url, content }: CardDicasProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};

  const IconComponent = iconMap[icon];

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className='flex flex-col items-center justify-center border rounded-[5px] p-2 cursor-pointer transition-colors duration-500 min-h-[100px]' style={{ 'color': themas?.corSecundaria, 'border': `1px solid ${themas?.corSecundaria}` }} >
        {(IconComponent && <IconComponent size={32} />) || <FaQuestionCircle size={32} />}
        <h3 className='line-clamp-1 mt-2 text-[16px] font-semibold'>{titleCard}</h3>
      </div>

      <ModalBase
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isHtml={true}
        img={image_url}
        title={titleCard}
        content={content}
      />
    </>
  )
}
