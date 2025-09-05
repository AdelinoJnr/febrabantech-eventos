import React, { useEffect, useState } from 'react';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import styles from '@/pages/sobre/sobre.module.scss';
import type { IGetPageSobre } from '@/@types/getPageSobre';
import { getPageSobre } from '@/services/event-extension.service';

export default function Sobre() {
  const [dataSobre, setDataSobre] = useState<IGetPageSobre>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("sobre");
  const { translate } = useTranslation();
  const { themas, eventId } = useAppCompany();

  useEffect(() => {
    if (!eventId) return;

    const fetchGetPageSobre = async () => {
      try {
        const result = await getPageSobre(eventId);
        console.log("result", result);
        setDataSobre(result);
      } catch (err) {
        console.error("Erro ao buscar app-company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [eventId]);

  if (loading || !dataSobre) {
    return <div>Loading...</div>;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className={styles.containerSobre}>

          <div className={styles.dataSobre}>
            <div>
              <p style={{ 'color': themas?.corSecundaria }}>
                { translate(dataSobre.title_about, dataSobre.title_about_translated) }
              </p>
            </div>
            <div>
              <img className={styles.imgSobre} src={ dataSobre.img_about } alt="Imagem sobre evento" />
            </div>
            
          </div>

          <div className={styles.descriptionSobre}>
            <div className={styles.divisorVertcal}></div>
            <div
              className='descriptionHtml'
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
