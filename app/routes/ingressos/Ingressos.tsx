import React, { useEffect, useState } from 'react';
import { Route } from './+types/Ingressos';
import { IGetPageIngressos } from '@/@types/getPageIngressos';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { useCache } from '@/providers/CacheProvider';
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';
import { getPageIngressos } from '@/services/event-extension.service';
import CardIngressos from '@/components/cards/cardIngressos/CardIngressos';

import styles from '@/routes/ingressos/ingressos.module.scss';
import ModalBase from '@/components/modals/modalBase/ModalBase';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Ingressos" },
    { name: "description", content: "Ingressos" },
  ];
}

export default function Ingressos() {
  const [dataIngressos, setDataIngressos] = useState<IGetPageIngressos>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { translate } = useTranslation();
  const { themas, eventId } = useAppCompany();
  const { cache, setCache } = useCache();

  useEffect(() => {
    if (!eventId) return;

    if (cache.ingressos) {
      setDataIngressos(cache.ingressos);
      setLoading(false);
      return;
    }

    const fetchGetPageIngressos = async () => {
      try {
        const result = await getPageIngressos(eventId);
        console.log(result);
        setDataIngressos(result);
        setCache({ ingressos: result });
      } catch (err) {
        console.error("Erro ao buscar conteudo 'Ingressos':", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGetPageIngressos();
  }, [eventId]);

  const trackButtonClick = () => {
    const script = document.createElement("script");
    script.text = `
    (function(a,b){
      a="https://iderydayattionsor.com/conversion.js?cid=OPTIONAL&payout=OPTIONAL&txid=OPTIONAL&param1=OPTIONAL&param2=OPTIONAL&param3=OPTIONAL&param4=OPTIONAL&param5=OPTIONAL";
      var c=b.createElement("script"),d=b.scripts[0];
      if(b=b.cookie.match(/(^| )vl-cid=([^;]+)/))
        if(-1<a.indexOf("cid="))
          a=a.replace(/cid=.*?(&|$)/,"cid="+b.pop()+"&");
        else{
          var e=-1<a.indexOf("?")?"&":"?";
          a+=e+"cid="+b.pop()
        }
      c.src=a;
      d.parentNode.insertBefore(c,d)
    })(window,document);
  `;
    document.head.appendChild(script);
  };

  if (loading || !dataIngressos) {
    return <OverlayLoading />;
  }

  return (
    <section className='page'>
      <div className='container'>

        <div className="container text-[#000]">
          <h3
            className="text-center font-bold text-[32px] mb-5"
            style={{ color: themas?.corSecundaria }}
          >
            Inscrições
          </h3>

          <div
            className="flex flex-col lg:flex-row lg:flex-wrap border-t-[20px] border-solid bg-white rounded-t-[4px]"
            style={{ borderTopColor: themas?.corSecundaria }}
          >
            {dataIngressos.tickets &&
              dataIngressos.tickets.map((ingresso, index) => {
                const isLastMobile = index === dataIngressos.tickets.length - 1;
                const isLeftColumn = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`
                      w-full lg:w-1/2
                      pb-4 mb-4
                      ${!isLastMobile ? 'border-b border-solid border-gray-300' : ''}
                      lg:border-b-0 lg:mb-0
                      ${isLeftColumn ? 'lg:border-r lg:border-gray-300' : ''}
                    `}
                  >
                    <CardIngressos
                      includes={ingresso.includes}
                      includes_en={ingresso.includes_en}
                      title_ticket_dy={ingresso.title_ticket_dy}
                      title_ticket_dy_en={ingresso.title_ticket_dy_en}
                      value_ticket_dy={ingresso.value_ticket_dy}
                    />
                  </div>
                );
              })}

            <div className='border-t border-solid border-gray-300 pt-[30px] m-auto mb-[30px]'>
              <a href={dataIngressos.ticket_link_ind} target="_blank" rel="noopener noreferrer">
                <button
                  onClick={trackButtonClick}
                  className='text-center bg-[#4851a3] rounded-[3px] text-[20px] font-medium text-white p-4 cursor-pointer border-none hover:bg-[#39bfe1]'
                >INSCREVA-SE AGORA</button>
              </a>
            </div>

          </div>

          <div className='bg-white rounded-b-[4px] p-3 text-center'>
            {
              (dataIngressos.title_link_question || dataIngressos.title_link_question_en)
              && (
                <div className='underline cursor-pointer' onClick={() => setIsModalOpen(true)}>
                  {translate(dataIngressos.title_link_question, dataIngressos.title_link_question_en)}
                </div>
              )
            }
          </div>

          <ModalBase
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isHtml={true}
            content={translate(dataIngressos.description_question, dataIngressos.description_question_en)}
          />

          <div className='text-center mt-[30px]'>
            <div className={styles.description}>já garantiu sua inscrição, mas quer alterar os dados?</div>
            <a href={dataIngressos.ticket_link_ind} target="_blank" rel="noopener noreferrer">
              <button
                onClick={trackButtonClick}
                className='text-center bg-[#4851a3] rounded-[3px] text-[14px] font-medium text-white p-3 cursor-pointer border-none hover:bg-[#39bfe1] mt-3'
              >GERENCIE SUA INSCRIÇÃO</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}