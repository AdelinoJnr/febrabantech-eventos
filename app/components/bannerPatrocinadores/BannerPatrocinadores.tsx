import React, { useEffect, useState } from 'react'
import { IGetPagePatrocinadores } from '@/@types/getPagePatrocinadores';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import { getPagePatrocinadores } from '@/services/event-extension.service';

export default function BannerPatrocinadores() {
  const [dataPatrocinadores, setDataPatrocinadores] = useState<IGetPagePatrocinadores>();
  const { eventId, themas } = useAppCompany();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.patrocinadores) {
      setDataPatrocinadores(cache.patrocinadores);
      return;
    }

    const fetchGetPagePatrocinadores = async () => {
      try {
        const result = await getPagePatrocinadores(eventId);
        setDataPatrocinadores(result);
        setCache({ patrocinadores: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Patrocinadores':", err);
      }
    };

    fetchGetPagePatrocinadores();
  }, [eventId]);

  return (
    <div className='container p-[16px]'>
      <picture>
        { dataPatrocinadores && (dataPatrocinadores.background_img_mobile || '') && <source media="(max-width: 600px)" srcSet={(dataPatrocinadores.background_img_mobile || '')} />}
        { dataPatrocinadores && (dataPatrocinadores.background_img_tablet || '') && <source media="(max-width: 1024px)" srcSet={(dataPatrocinadores.background_img_tablet || '')} /> }
        { dataPatrocinadores && (dataPatrocinadores.background_img || dataPatrocinadores.sponsor_image_one || '') && 
          <img src={(dataPatrocinadores.background_img || dataPatrocinadores.sponsor_image_one || '')} alt="Patrocinador evento" style={{ width: '100%', height: 'auto' }} /> }
      </picture>
    </div>
  )
}
