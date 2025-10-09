import React, { useEffect, useState } from 'react'
import { Route } from '../detalheNoticias/+types/DetalheNoticias';
import { useLocation } from 'react-router';
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
  const data = location.state as { id: string };

  useEffect(() => {
    if (!data.id) return;

    const fetchGetPageSobre = async () => {
      try {
        // const result = await getPageSobre(data.id);
        // setDataNoticias(result);
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Sobre':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [data.id]);

  if (loading || !dataNoticias) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2>Biometrias avançadas reforçam segurança no setor financeiro</h2>
        <p>No Febraban Tech 2025, especialistas destacaram que a tecnologia se tornou essencial</p>

        <img src="" alt="" />

        <div dangerouslySetInnerHTML={{ __html: dataNoticias.content }}></div>

      </div>
    </section>
  )
}
