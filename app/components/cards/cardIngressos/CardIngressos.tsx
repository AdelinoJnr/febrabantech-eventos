import React from 'react'

import { CardIngressosProps } from '@/@types/propsComponents'
import { CiCircleCheck } from "react-icons/ci";
import { useTranslation } from '@/hooks/useTranslation';
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { formatCurrency } from '@/utils/formatCurrency';
import { translationArray } from "@/utils/translationArray";

export default function CardIngressos({ includes, includes_en, title_ticket_dy, title_ticket_dy_en, value_ticket_dy }: CardIngressosProps) {
  const { translate } = useTranslation();
  const { dataEvent } = useAppCompany();
  const { themas } = dataEvent || {};
  const { translateArray } = translationArray();

  return (
    <div className='pe-5 ps-5 pt-3 pb-3'>
      <h3 className='text-center text-[18px] font-bold text-[#4851a3]'>{translate(title_ticket_dy, title_ticket_dy_en)}</h3>
      <div className='text-center text-[35px] font-bold' style={{ 'color': themas?.corSecundaria }}>{formatCurrency(value_ticket_dy)}</div>
      <div className='text-[18px] font-bold text-[#4851a3] mb-1'>Inclui:</div>
      {includes && translateArray(includes, includes_en).map((item, index) => (
        <div key={index} className="flex gap-1 ms-3">
          <CiCircleCheck className='flex-none mt-1' color="#6BCDB2" />
          <span className='text-[#000] font-semibold mb-1'>{item}</span>
        </div>
      ))}

    </div>
  )
}
