import React, { useEffect, useState } from 'react'
import { Route } from './+types/Trilhas';

import { IGetPageTrilhas } from '@/@types/getPageTrilhas';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { getPageTrilhas } from '@/services/event-extension.service';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';

import styles from '@/routes/trilhas/trilhas.module.scss';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Trilhas" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Trilhas() {
  const [dataTrilhas, setDataTrilhas] = useState<IGetPageTrilhas>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("trilhas");
  const { translate } = useTranslation();
  const { themas, eventId } = useAppCompany();

  useEffect(() => {
    if (!eventId) return;

    const fetchGetPageTrilhas = async () => {
      try {
        const result = await getPageTrilhas(eventId);
        console.log("result", result);
        setDataTrilhas(result);
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Trilhas':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageTrilhas();
  }, [eventId]);

  if (loading || !dataTrilhas) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className={styles.containerTrilhas}>

          <div className="flex flex-1">
            <div
              className={styles.descriptionHtml}
              dangerouslySetInnerHTML={{
                __html: translate(dataTrilhas.description_trail, dataTrilhas.description_trail_translated),
              }}
            />
          </div>
        </div>
        
      </div>
    </section>
  )
}
