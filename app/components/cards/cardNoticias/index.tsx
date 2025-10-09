import React from 'react'
import { CardNoticiasProps } from '@/@types/propsComponents';
import defaultImg from "@/assets/images/default_news.jpg";

import { FaVideo } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { Link } from 'react-router';

export default function CardNoticias({ id, title, img, description, typeNew, friendly_url }: CardNoticiasProps) {
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};

  return (
    <Link to={`/notícias/${friendly_url}`} state={{ id }}>
      <div className='bg-white text-black rounded-md shadow-md flex flex-col gap-1 w-[255px] h-[350px] relative cursor-pointer'>
        <img className='h-[150px] rounded-t-md mb-3' src={ img || defaultImg } alt={ title } />
        <h4 className='ps-2 pe-2 font-semibold text-[14px] line-clamp-3' style={{ 'color': themas?.corSecundaria }}>{ title }</h4>
        <div className='ps-2 pe-2 text-[12px] mb-[30px] line-clamp-4'>{ description }</div>
        <div className="absolute bottom-2 left-2">
          {typeNew === 1 ? (
            <FaVideo size={25} style={{ color: themas?.corSecundaria }} />
          ) : (
            <MdOutlineTextFields size={25} style={{ color: themas?.corSecundaria }} />
          )}
        </div>
      </div>
    </Link>
  )
}
