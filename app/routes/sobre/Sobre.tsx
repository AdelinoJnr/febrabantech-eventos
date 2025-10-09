import React, { useEffect, useState } from 'react';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import type { IGetPageSobre } from '@/@types/getPageSobre';
import { getPageSobre } from '@/services/event-extension.service';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { Route } from './+types/Sobre';
import styles from '@/routes/sobre/sobre.module.scss';
import { useCache } from '@/providers/CacheProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sobre" },
    { name: "description", content: "Sobre" },
  ];
}

export default function Sobre() {
  const { dataEvent } = useAppCompany();
  const { eventId, themas } = dataEvent || {};
  const [dataSobre, setDataSobre] = useState<IGetPageSobre>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("sobre");
  const { translate } = useTranslation();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.sobre) {
      setDataSobre(cache.sobre);
      setLoading(false);
      return;
    }

    const fetchGetPageSobre = async () => {
      try {
        const result = await getPageSobre(eventId);
        setDataSobre(result);
        setCache({ sobre: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Sobre':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [eventId]);

  if (loading || !dataSobre) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className={styles.containerSobre}>

          <div className={styles.dataSobre}>
            <div>
              <div className='text-[30px]' style={{ 'color': themas?.corSecundaria }}>
                { translate(dataSobre.title_about, dataSobre.title_about_translated) }
              </div>
            </div>
            <div>
              <img className={styles.imgSobre} src={ dataSobre.img_about } alt="Imagem sobre evento" />
            </div>
            
          </div>

          <div className={styles.descriptionSobre}>
            <div className={styles.divisorVertcal}></div>
            <div
              className={styles.descriptionHtml}
              dangerouslySetInnerHTML={{
                __html: translate(dataSobre.description_about, dataSobre.description_about_translated),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
