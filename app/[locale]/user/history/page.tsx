'use client';

import {useTranslations} from 'next-intl';
import React from "react";
import { useState }  from "react";
import Link from 'next/link';
import Layout from '@/components/Layout';
import {useLocale} from '@/contexts/LocaleContext';
import CustomDatepicker from '@/components/forms/CustomDatepicker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const History = () => {
  const t = useTranslations('History');
  const histories = [
    {
      id: 1,
      action: t('action.site_visit'),
      date: "10.09.2024",
      time: "13:11:30",
      brand: "ATL"
    },
    {
      id: 2,
      action: t('action.buy'),
      date: "05.09.2024",
      time: "11:41:31",
      brand: "Bagland"
    },
  ]
  const { locale } = useLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [value, onChange] = useState<Value>(null);

  return (
    <Layout>
      <div className='m-auto mx-5 mb-4 mt-4 flex flex-col items-center justify-center'>
        <h2 className="text-center text-2xl dark-text-white">{t('title')}</h2>
      </div>
      <div className='dark-text-white max-w-500 -mx-3 md:mx-auto'>
        <div className='form-control m-3'>
          <label className='text-sm mb-1 block'>{t('search_by_date')}</label>
          <CustomDatepicker className="max-w-[240px] w-full transition-none" value={value} onChange={onChange} />
        </div>
        {histories.map((history) => (
          <div className="history-item flex m-3" key={history.id}>
            <div className="w-3/4 mt-4">
              {history.action} {history.date}, {history.time}
              <p className="text-green">{history.brand}</p>
            </div>
            <Link href={baseUrl+locale+`/user/disputs?offerId=${history.id}&offerName=${history.brand}&date=${history.date}`} className="m-2 history-btn btn-secondary hover-green inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
              {t('button_text')}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default History;