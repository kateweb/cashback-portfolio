'use client';

import {useTranslations} from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Offers from "@/components/Offers";
import {useLocale} from "@/contexts/LocaleContext";

const CategoryPage = ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const t = useTranslations('Offer');
  const { id } = useParams(); // Get category ID from URL
  const router = useRouter();
  const { locale } = useLocale();

  const handleBackButtonClick = () => {
    // Push user to main page with the current locale
    router.push(`/${locale}`);
  };

  return (
    <Layout>
      <div className='top-block my-6 md:my-10'>
        <button onClick={handleBackButtonClick}
          className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          <svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          {t('back_button')}
        </button>
        <h1 className="mx-auto text-center text-3xl font-bold dark-text-white">{}</h1>
      </div>
      <Offers searchParams={searchParams} categoryId={id as string} />
    </Layout>
  );
};

export default CategoryPage;