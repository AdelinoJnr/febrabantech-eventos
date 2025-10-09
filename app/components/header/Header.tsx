import React, { useEffect } from 'react';

import { useAppCompany } from "@/providers/AppCompanyProvider";
import styles from "./Header.module.scss";
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';

export default function Header() {
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};

  // const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setLang(e.target.value as 'br' | 'en');
  // };


  return (
    
  )
}
