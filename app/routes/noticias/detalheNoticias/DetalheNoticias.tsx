import React, { useEffect, useState } from 'react'
import { Route } from '../detalheNoticias/+types/DetalheNoticias';
import { useLocation, useParams } from 'react-router';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { IGetPageNoticias } from '@/@types/getPageNoticias';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Notícias Destaque" },
    { name: "description", content: "Notícias Destaque" },
  ];
}

export default function DetalheNoticias() {
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};
  const [loading, setLoading] = useState(true);
  const [dataNoticias, setDataNoticias] = useState<IGetPageNoticias>();
  const location = useLocation();
  const { friendly_url } = useParams<{ friendly_url: string }>();

  useEffect(() => {
    if (!friendly_url) return;

    const fetchGetPageSobre = async () => {
      try {
        // const result = await getPageSobre(friendly_url);
        // setDataNoticias();
      } catch (err) {
        console.error("Erro ao buscar noticia pela URL (friendly_url):", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [friendly_url]);

  if (loading || !dataNoticias) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h3 className='text-[30px] font-bold mb-3' style={{ 'color': themas?.corSecundaria }}>{dataNoticias.heading}</h3>
        <p className='text-[17px] mb-5'>{dataNoticias.subheading}</p>

        <img className='w-[100%]' src={dataNoticias.cover_image} alt={dataNoticias.heading} />

        <div dangerouslySetInnerHTML={{ __html: dataNoticias.content }}></div>

      </div>
    </section>
  )
}
