import React, { useEffect, useState } from 'react'
import { Route } from './+types/Patrocinadores';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import { getPagePatrocinadores } from '@/services/event-extension.service';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { IGetPagePatrocinadores } from '@/@types/getPagePatrocinadores';
import { useTranslation } from '@/hooks/useTranslation';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Patrocinadores" },
    { name: "description", content: "Patrocinadores" },
  ];
}

export default function Patrocinadores() {
  const [dataPatrocinadores, setDataPatrocinadores] = useState<IGetPagePatrocinadores>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("patrocinadores");
  const { translate } = useTranslation();
  const { eventId, themas } = useAppCompany();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.patrocinadores) {
      setDataPatrocinadores(cache.patrocinadores);
      setLoading(false);
      return;
    }

    const fetchGetPageSobre = async () => {
      try {
        const result = await getPagePatrocinadores(eventId);
        setDataPatrocinadores(result);
        setCache({ patrocinadores: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Patrocinadores':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [eventId]);

  if (loading || !dataPatrocinadores) {
    return <OverlayLoading />;
  }

  const imagePath = dataPatrocinadores.background_img 
    || dataPatrocinadores.sponsor_image_one 
    || '';
  const imagePathTablet = dataPatrocinadores.background_img_tablet || '';
  const imagePathMobile = dataPatrocinadores.background_img_mobile || '';
  

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div>
          <picture>
            {imagePathMobile && <source media="(max-width: 600px)" srcSet={imagePathMobile} />}
            {imagePathTablet && <source media="(max-width: 1024px)" srcSet={imagePathTablet} />}
            {imagePath && <img src={imagePath} alt="Patrocinador evento" style={{ width: '100%', height: 'auto' }} />}
          </picture>
        </div>
      </div>
    </section>
  )
}