'use client';

import {useTranslations} from 'next-intl';
import React from "react";
import Link from 'next/link';
import Layout from '@/components/Layout';
import {Select, SelectItem} from "@nextui-org/select";
import {useLocale} from '@/contexts/LocaleContext';
import {DatePicker} from "@nextui-org/date-picker";

import {I18nProvider} from "@react-aria/i18n";

const History = () => {
  const t = useTranslations('History');
  const statuses = [
    {
      action: t('action.site_visit'),
      date: "10.09.2024",
      time: "13:11:30",
      brand: "ATL"
    },
    {
      action: t('action.buy'),
      date: "05.09.2024",
      time: "11:41:31",
      brand: "Bagland"
    },
  ]

  const { locale } = useLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
        <p className="text-center text-lg dark-text-white">
          {t('title')} 
          <Link href={baseUrl+locale+"/user/settings/delete"} className="text-red-500 ms-2">{t('link_text')}</Link>
        </p>
      </div>
      <div className='my-5 mx-5 dark-text-white '>
        <div className='flex justify-content-center'>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('waiting')+"0 "+t('uah')}
          </div>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('available')+"0 "+t('uah')}
          </div>
        </div>
        <div className='flex justify-content-center'>

          <I18nProvider locale={locale}>
            <DatePicker 
              showMonthAndYearPickers
              label={t('choose_date')} 
              className="max-w-xs m-3"
              />
          </I18nProvider>
        </div>
      </div>
    </Layout>
  );
};

export default History;