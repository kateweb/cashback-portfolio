'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLocale } from '@/contexts/LocaleContext';

const Faq = () => {
  const { locale } = useLocale();
  const t = useTranslations('Faq');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='my-5 mx-5 '>
        <h2 className="mb-2 font-bold dark:text-white">{t('title')}</h2>
        <Link href={baseUrl+locale+"/user/history"} className="m-2 offer-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          {t('button_text')}
        </Link>
      </div>
    </Layout>
  );
};

export default Faq;