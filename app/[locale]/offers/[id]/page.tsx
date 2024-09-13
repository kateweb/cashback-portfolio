'use client';

import {useTranslations} from 'next-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
import Layout from '@/components/Layout';
import { useLocale } from '@/contexts/LocaleContext';

const OfferPage = () => {
  const { locale } = useLocale();
  const [offer, setOffer] = useState(null);
  const t = useTranslations('Offer');
  const { id } = useParams(); // Get category ID from URL


  useEffect(() => {
    
    // Fetch or filter cards based on category ID
    const fetchFilteredCards = async () => {
      try {
        // Assuming you fetch data from an API
        const response = await fetch(`/api/offers/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'lang': locale,                 
          },
        });
        const data = await response.json();
        setOffer(data);
      } catch (error) {
        console.error('Error fetching offer:', error);
      }
    };
    
    fetchFilteredCards();
  }, [id, locale]);
  

  if (!offer) {
    return <div className='overlay mt-5'><Image src="/img/loader.svg" alt="Loader" className="w-10 h-10 loader" width={50} height={50}/></div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <Layout>
        <div key={offer['brand']} className='flex align-items-center flex-column'>
          <div className='top-block w-full my-6 md:my-10'>
            <button onClick={() => window.history.back()}
              className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
              <svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
              </svg>
              {t('back_button')}
            </button>
            <h1 className="mx-auto text-center text-3xl font-bold dark-text-white">{offer['brand']}</h1>
          </div>
          <div className='text-md my-4 text-gray-500'>{offer['category']}</div>
          <div className='w-48'>
            <Image src={offer['imgUrl']} alt={offer['brand']} className="offer-img mb-4 object-contain w-full" width={50} height={50} />
            </div>
          <Link target='_blank' href={offer['link']} className="m-2 offer-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
            {t('button_text')}
          </Link>
          <Link key={offer['category']} href={`/${locale}/category/${offer['categoryId']}`} className="hover-green bg-gray-50 border border-gray-300 text-gray-900 text-center rounded-full px-4 py-2 m-2 text-sm font-medium dark-bg-gray-700 dark-border-gray-600 dark-text-white">
            {offer['category']}
          </Link>
          <div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
            <div className="flex flex-col space-y-1.5 p-6">{t('info')}</div>
            {offer?.['info'] && (
              <div className='p-6 pt-0' dangerouslySetInnerHTML={{ __html: offer['info'] }} />
            )}
          </div>
          <div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
            <div className="flex flex-col space-y-1.5 p-6">{t('conditions')}</div>
            {offer?.['conditions'] && (
              <div className='p-6 pt-0' dangerouslySetInnerHTML={{ __html: offer['conditions'] }} />
            )}
          </div>
          <div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
            {offer?.['text'] && (
              <div className='p-6' dangerouslySetInnerHTML={{ __html: offer['text'] }} />
            )}
          </div>
        </div>

    </Layout>
  );
};

export default OfferPage;