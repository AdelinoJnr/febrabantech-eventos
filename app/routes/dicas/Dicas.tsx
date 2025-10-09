import { Dicas, IGetPageDicas } from '@/@types/getPageDicas';
import CardDicas from '@/components/cards/cardDicas';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import { getPageDicas } from '@/services/event-extension.service';
import React, { useEffect, useState } from 'react'
import { Route } from './+types/Dicas';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dicas" },
    { name: "description", content: "Dicas" },
  ];
}

export default function Dicas() {
  const [dataDicas, setDataDicas] = useState<IGetPageDicas>();

  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("dicas");
  const { translate } = useTranslation();
  const { dataEvent } = useAppCompany();
  const { themas, eventId, address } = dataEvent || {};
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

  const addressEvent =(): string => {
    return `${address?.logradouro} ${address?.number}, ${address?.city} - ${address?.city_state}, ${address?.country}`;
  }

  if (loading || !dataDicas) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className='mb-[50px] bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url(${dataDicas.img_banner_tip})` }}>
          <div className='mb-2'>
            <iframe className='h-[400px] w-full p-[20px]' src={`https://embed.waze.com/iframe?zoom=16&lat=${dataDicas.waze_lat || ''}&lon=${dataDicas.waze_lon || ''}&pin=1`}></iframe>
          </div>

          <div className='p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
            <div className='mb-5'>
              <h3 style={{ color: dataDicas.color_banner_tip || themas?.corSecundaria }} className='text-[28px] font-semibold'>{ dataDicas.title_banner_tip }</h3>
              <p style={{ color: dataDicas.color_banner_tip || themas?.corSecundaria }}>{ addressEvent() }</p>
            </div>

            { dataDicas.link_google_map_tip &&
              <div className='bg-black/80 p-3 rounded-md text-center'>
                <a
                  href={dataDicas.link_google_map_tip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calcular rota
                </a>
              </div>
            }
            
          </div>
        </div>

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
