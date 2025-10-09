import React, { useEffect, useState } from 'react'
import { Route } from './+types/ListaNoticias';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { IGetPageNoticias } from '@/@types/getPageNoticias';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useCache } from '@/providers/CacheProvider';
import { getPageNoticias } from '@/services/event-extension.service';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import CardNoticias from '@/components/cards/cardNoticias';
import defaultImg from "@/assets/images/default_news.jpg";
import { FaVideo } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";
import BannerPatrocinadores from '@/components/bannerPatrocinadores/BannerPatrocinadores';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Notícias" },
    { name: "description", content: "Notícias" },
  ];
}

export default function ListaNoticias() {
  const { dataEvent } = useAppCompany();
  const { eventId, themas } = dataEvent || {};
  const [dataNoticias, setDataNoticias] = useState<IGetPageNoticias[]>();
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("noticias");
  const { translate } = useTranslation();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.noticias) {
      setDataNoticias(cache.noticias);
      setLoading(false);
      return;
    }

    const fetchGetPageSobre = async () => {
      try {
        const result = await getPageNoticias(eventId);
        console.log('result', result)
        setDataNoticias(result);
        setCache({ noticias: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Sobre':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [eventId]);

  if (loading || !dataNoticias) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        {/* <div className='flex flex-col lg:flex-row gap-4 mb-8'>
          <div className='bg-white text-black rounded-md shadow-md flex flex-col gap-1 w-[455px] h-[520px] relative mb-[50px]'>
            <img className='h-[250px] p-3' src={ dataNoticias[0].cover_image || defaultImg } alt={ dataNoticias[0].heading } />
            <h4 className='ps-3 pe-3 font-bold text-[24px] line-clamp-3' style={{ 'color': themas?.corSecundaria }}>{ dataNoticias[0].heading }</h4>
            <span className='ps-3 pe-3 text-[18px] font-semibold mb-[30px] line-clamp-4'>{ dataNoticias[0].subheading }</span>
            <div className="absolute bottom-2 left-2">
              { dataNoticias[0].content_type === 1 ? (
                <FaVideo size={25} style={{ color: themas?.corSecundaria }} />
              ) : (
                <MdOutlineTextFields size={25} style={{ color: themas?.corSecundaria }} />
              )}
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='bg-white text-black rounded-md shadow-md flex gap-1 w-[650px] h-[250px] relative'>
              <img className='w-[270px] p-3 object-cover' src={ dataNoticias[1].cover_image || defaultImg } alt={ dataNoticias[1].heading } />
              <div className='flex flex-col'>
                <h4 className='pt-3 font-bold text-[24px] mb-3 line-clamp-2' style={{ 'color': themas?.corSecundaria }}>{ dataNoticias[1].heading }</h4>
                <span className='text-[18px] font-semibold mb-[30px] line-clamp-4'>{ dataNoticias[1].subheading }</span>
              </div>
              <div className="absolute bottom-2 right-2">
                { dataNoticias[1].content_type === 1 ? (
                  <FaVideo size={25} style={{ color: themas?.corSecundaria }} />
                ) : (
                  <MdOutlineTextFields size={25} style={{ color: themas?.corSecundaria }} />
                )}
              </div>
            </div>

            <div className='bg-white text-black rounded-md shadow-md flex gap-1 w-[650px] h-[250px] relative'>
              <img className='w-[270px] p-3 object-cover' src={ dataNoticias[2].cover_image || defaultImg } alt={ dataNoticias[2].heading } />
              <div className='flex flex-col'>
                <h4 className='pt-3 font-bold text-[24px] mb-3 line-clamp-2' style={{ 'color': themas?.corSecundaria }}>{ dataNoticias[2].heading }</h4>
                <span className='text-[18px] font-semibold mb-[30px] line-clamp-4'>{ dataNoticias[2].subheading }</span>
              </div>
              <div className="absolute bottom-2 right-2">
                { dataNoticias[2].content_type === 1 ? (
                  <FaVideo size={25} style={{ color: themas?.corSecundaria }} />
                ) : (
                  <MdOutlineTextFields size={25} style={{ color: themas?.corSecundaria }} />
                )}
              </div>
            </div>
          </div>
        </div> */}
        

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {  dataNoticias.map((item, index) => (
            <CardNoticias
              key={index}
              img={item.cover_image}
              title={item.heading}
              description={item.subheading}
              typeNew={item.content_type}
              friendly_url={item.friendly_url}
            />
          ))}
        </div>
      </div>

      <BannerPatrocinadores />
    </section>
  )
}
