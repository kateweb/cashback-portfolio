'use client';

import {useTranslations} from 'next-intl';
import React from "react";
import Layout from '@/components/Layout';
import {Select, SelectItem} from "@nextui-org/select";
import {useLocale} from '@/contexts/LocaleContext';
import {DatePicker} from "@nextui-org/date-picker";

import {I18nProvider} from "@react-aria/i18n";

const Cashback = () => {
  const t = useTranslations('Cashback');
  const statuses = [
    {
      key: "available",
      label: t('status.available')
    },
    {
      key: "waiting",
      label: t('status.waiting')
    },
    {
      key: "declined",
      label: t('status.declined')
    }
  ]

  const { locale } = useLocale();

  return (
    <Layout>
      <div className='my-5 -mx-3 md:mx-5 dark-text-white '>
        <div className='flex justify-content-center'>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('waiting')+"0 "+t('uah')}
          </div>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('available')+"0 "+t('uah')}
          </div>
        </div>
        <div className='flex justify-content-center'>
          <Select 
            label={t('status.title')}
            className="max-w-xs m-3" >
            {statuses.map((status) => (
              <SelectItem key={status.key}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
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

export default Cashback;