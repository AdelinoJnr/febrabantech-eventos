import { Dicas, IGetPageDicas } from '@/@types/getPageDicas';
import CardDicas from '@/components/cards/cardDicas';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import { getPageDicas } from '@/services/event-extension.service';
import React, { useEffect, useState } from 'react'

export default function Dicas() {
  const [dataDicas, setDataDicas] = useState<IGetPageDicas>();

  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("dicas");
  const { translate } = useTranslation();
  const { themas, eventId } = useAppCompany();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.dicas) {
      setDataDicas(cache.dicas);
      setLoading(false);
      return;
    }

    const fetchGetPageDicas = async () => {
      try {
        const result = await getPageDicas(eventId);
        console.log(result)
        setDataDicas(result);
        setCache({ dicas: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Dicas':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageDicas();
  }, [eventId]);

  if (loading || !dataDicas) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {dataDicas?.dicas && dataDicas.dicas.map((item: Dicas, index: number) => (
            <CardDicas
              key={index}
              image_url={item.image_url}
              icon={item.icon}
              content={translate(item.content, item.content_translated)}
              titleCard={translate(item.tip_title, item.tip_title_translated)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
