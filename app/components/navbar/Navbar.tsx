import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppCompany } from "@/providers/AppCompanyProvider";
import styles from "./navbar.module.scss";
import OverlayLoading from '../overlayLoading/OverlayLoading';
import { useTranslation } from '@/hooks/useTranslation';
import type { INavbar } from '@/@types/appConfig';

export default function Navbar() {
  const { themas, navbar, loading } = useAppCompany();
  const { translate } = useTranslation();

  if (loading || !navbar) {
    return <OverlayLoading />;
  }

  return (
    <div className={styles.navbar} style={{ backgroundColor: themas?.corMenu }}>
      {navbar && navbar.map((item: INavbar, index: number) => (
          <div
            key={index}
            onClick={() => {console.log(item.value)}}
          >
            {translate(item.viewValue, item.seeEnglishValue).toLowerCase()}
          </div>
        ))}
    </div>
  )
}