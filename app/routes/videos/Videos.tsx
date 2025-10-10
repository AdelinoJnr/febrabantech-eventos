import { IGetPageVideos } from '@/@types/getPageVideos';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import { getPageVideos } from '@/services/event-extension.service';
import React, { useEffect, useState } from 'react'
import { Route } from './+types/Videos';
import { useLoginModal } from '@/providers/LoginModalProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Videos" },
    { name: "description", content: "Videos" },
  ];
}

export default function Videos() {
  const { dataEvent } = useAppCompany();
  const { eventId, themas } = dataEvent || {};
  const [dataVideos, setDataVideos] = useState<IGetPageVideos[]>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("videos");
  const { translate } = useTranslation();
  const { cache, setCache } = useCache();

  const { openModal } = useLoginModal();

  useEffect(() => {
    if (!eventId) return;

    if (cache.videos) {
      setDataVideos(cache.videos);
      setLoading(false);
      return;
    }

    const fetchGetPageVideos = async () => {
      try {
        const result = await getPageVideos(eventId);
        console.log('result videos', result)
        setDataVideos(result);
        setCache({ videos: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo de 'Videos':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageVideos();
  }, [eventId]);

  if (loading || !dataVideos) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>


        <button className='cursor-pointer' onClick={openModal}>LOGIN</button>
      </div>
    </section>
  )
}
