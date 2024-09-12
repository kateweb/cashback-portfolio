'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLocale } from '@/contexts/LocaleContext';

const Rules = () => {
  const { locale } = useLocale();
  const t = useTranslations('Rules');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='my-5 mx-5 dark:text-white'>
        <h2 className="mb-4 font-bold text-xl">{t('title')}</h2>
        <p className='text-lg mb-4'>{t('subtitle')}</p>
        <ol className='ordered-list text-lg'>
          {Array.from({ length: 7 }, (_, i) => {
            const itemNumber = i + 1;
            return (
              <li className='mb-4' key={itemNumber}>
                {itemNumber === 3 ? (
                  <> {t(`rules_list.${itemNumber}`)} <p className='text-sm mt-2'>{t('rules_list.3_notice')}</p></>) 
                  : ( t(`rules_list.${itemNumber}`))}
              </li>
            );
          })}
        </ol>
      </div>
    </Layout>
  );
};

export default Rules;