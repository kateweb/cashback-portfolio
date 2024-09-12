'use client';

import {useTranslations} from 'next-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from 'next/image'
import CashbackCard from '@/components/CashbackCard';
import { useLocale } from '@/contexts/LocaleContext';

const CategoryPage = () => {
  const { locale } = useLocale();
  const [filteredOffers, setOffers] = useState([]);
  const t = useTranslations('Offer');
  const { id } = useParams(); // Get category ID from URL


  useEffect(() => {
    // Fetch or filter cards based on category ID
    const fetchFilteredCards = async () => {
      try {
        // Assuming you fetch data from an API
        const response = await fetch(`/api/offers?category=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'lang': locale,                 
          },
        });
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offer:', error);
      }
    };
    fetchFilteredCards();
  }, [id, locale]);

  if (!filteredOffers) {
    return <div className='overlay mt-5'><Image src="/img/loader.svg" alt="Loader" className="w-10 h-10 loader" width={50} height={50}/></div>; // Display a loading message or spinner while data is being fetched
  }

  return (
    <Layout>
      <div className='top-block my-6 md:my-10'>
        <button onClick={() => window.history.back()}
          className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          {t('back_button')}
        </button>
        <h1 className="mx-auto text-center text-3xl font-bold dark:text-white">{filteredOffers.map(offer =>  offer['category'])[0]}</h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredOffers.map((offer) => (
          <CashbackCard
            id={offer['id']}
            key={offer['brand']}
            brand={offer['brand']}
            cashback={offer['cashback']}
            category={offer['category']}
            imgUrl={offer['imgUrl']}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;