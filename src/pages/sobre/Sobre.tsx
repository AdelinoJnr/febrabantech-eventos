import React, { useEffect, useState } from 'react';
import type { IAppConfig } from '@/src/@types/appConfig';
import { useAppCompany } from '@/app/AppCompanyProvider';
import { useNavbarTitle } from '@/src/hooks/useNavbarTitle';
import { useTranslation } from '@/src/hooks/useTranslation';

export function meta() {
  return [
    { title: "Sobre" },
    { name: "description", content: "Informações sobre o evento" },
  ];
}

export default function Sobre() {
  const { viewValue, seeEnglishValue } = useNavbarTitle("sobre");
  const { translate } = useTranslation();
  const { themas, navbar, loading, dataHeader } = useAppCompany();

  if (loading || !dataHeader) {
    return <div>Loading...</div>;
  }

  return (
    <section className='page'>
      <div className='container'>
        <div>
          <h2 style={{ 'color': themas?.corSecundaria }}>{ translate(viewValue, seeEnglishValue) }</h2>
          <div 
            className='descriptionHtml'
            style={{ 'color': '#fff' }}
            dangerouslySetInnerHTML={{
              __html: translate(dataHeader.description_about, dataHeader.description_about),
            }}
          />
        </div>
      </div>
    </section>
  )
}
