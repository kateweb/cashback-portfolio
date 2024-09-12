'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLocale } from '@/contexts/LocaleContext';

const Help = () => {
  const { locale } = useLocale();
  const t = useTranslations('Help');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
        <h1 className="mb-5 text-center text-lg dark:text-white">{t('title')}</h1>
        <Link href={baseUrl+locale+"/user/history"} className="m-2 offer-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          {t('button_text')}
        </Link>
      </div>
    </Layout>
  );
};

export default Help;