import React from 'react'
import { useTranslation } from '@/hooks/useTranslation';
import { FaPlus } from "react-icons/fa6";
import { useAppCompany } from '@/providers/AppCompanyProvider';

import styles from '@/components/cards/cardPalestrantes/cardPalestrantes.module.scss';

type CardPalestrantesProps = {
  id: string;
  image_url: string;
  speaker_name: string;
  pseudonym: string
  mini_bio: string;
  mini_bio_en: string;
  handleClick: (id: string) => void;
};

export default function CardPalestrantes({ id, image_url, speaker_name, pseudonym, mini_bio, mini_bio_en, handleClick }: CardPalestrantesProps) {
  const { translate } = useTranslation();
  const { themas } = useAppCompany();

  return (
    <div className={styles.cardPalestrantes} onClick={() => handleClick(id)}>
      <img src={image_url || "./app/assets/images/user_placeholder.png"} alt={speaker_name} />
      <h5 style={{ 'color': themas?.corSecundaria }} className='line-clamp-2 mt-1 mb-1'>{pseudonym || speaker_name}</h5>
      <p className='line-clamp-4'>{mini_bio && translate(mini_bio, mini_bio_en) || 'sem biografia'}</p>
      <div className='flex justify-center items-center gap-2 cursor-pointer mt-3' style={{ 'color': themas?.corSecundaria }}>ver <FaPlus /> </div>
    </div>
  )
}
