import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppCompany } from "@/providers/AppCompanyProvider";
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { useTranslation } from '@/hooks/useTranslation';
import type { INavbar } from '@/@types/appConfig';

import styles from "./navbar.module.scss";

export default function Navbar() {
  const { themas, navbar, loading } = useAppCompany();
  const { translate } = useTranslation();
  const navigate = useNavigate();

  if (loading || !navbar) {
    return <OverlayLoading />;
  }

  return (
    <nav className={styles.navbar} style={{ backgroundColor: themas?.corMenu }}>
      {navbar && navbar.map((item: INavbar, index: number) => (
          <div
            key={index}
            onClick={() => navigate(`/${(item.viewValue).toLowerCase()}`)}
          >
            {translate(item.viewValue, item.seeEnglishValue).toLowerCase()}
          </div>
        ))}
    </nav>
  )
}