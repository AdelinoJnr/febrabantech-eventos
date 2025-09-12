import React, { useEffect, useState } from 'react'
import { Route } from './+types/Palestrantes';
import { useNavbarTitle } from '@/hooks/useNavbarTitle';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { getPagePalestrantes } from '@/services/event-extension.service';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import CardPalestrantes from '@/components/cards/cardPalestrantes/CardPalestrantes';
import { IGetPagePalestrantes } from '@/@types/getPagePalestrantes';
import ModalPalestrantes from '@/components/modals/modalPalestrantes/ModalPalestrantes';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Palestrantes" },
    { name: "description", content: "Palestrantes" },
  ];
}

export default function Patrocinadores() {
  const [dataPalestrantes, setDataPalestrantes] = useState<IGetPagePalestrantes[]>([]);
  const [selectedPalestrante, setSelectedPalestrante] = useState<IGetPagePalestrantes | null>(null);
  const [loading, setLoading] = useState(true);
  const { viewValue, seeEnglishValue } = useNavbarTitle("palestrante");
  const { translate } = useTranslation();
  const { themas, eventId } = useAppCompany();

  useEffect(() => {
    if (!eventId) return;

    const fetchGetPageSobre = async () => {
      try {
        const result = await getPagePalestrantes(eventId);
        setDataPalestrantes(result);
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Sobre':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageSobre();
  }, [eventId]);

  const handleClick = (id: string) => {
    const palestrante = dataPalestrantes.find((p) => p.id === id);
    if (palestrante) setSelectedPalestrante(palestrante);
  };

  if (loading || !dataPalestrantes) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>
        <h2 style={{ 'color': themas?.corSecundaria }}>{translate(viewValue, seeEnglishValue).toLowerCase()}</h2>

        <div className='flex flex-wrap gap-5 justify-center'>
          {dataPalestrantes &&
            dataPalestrantes.map((item: IGetPagePalestrantes) => (
              <CardPalestrantes
                key={item.id}
                image_url={item.image_url}
                speaker_name={item.speaker_name}
                mini_bio={item.mini_bio}
                mini_bio_en={item.mini_bio_en}
                pseudonym={item.pseudonym}
                id={item.id}
                handleClick={handleClick}
              />
            ))}
        </div>

        { selectedPalestrante && 
          <ModalPalestrantes
            isOpen={!!selectedPalestrante}
            onClose={() => setSelectedPalestrante(null)}
            key={selectedPalestrante.id}
            image_url={selectedPalestrante.image_url} 
            speaker_name={selectedPalestrante.speaker_name}
            mini_bio={selectedPalestrante.mini_bio}
            mini_bio_en={selectedPalestrante.mini_bio_en}
            pseudonym={selectedPalestrante.pseudonym}
            agenda={selectedPalestrante.agenda}
          /> }
      </div>
    </section>
  )
}
