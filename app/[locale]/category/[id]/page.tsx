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
  const t = useTranslations('Nav');
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
      <h1 className="my-10 text-center text-3xl font-bold dark:text-white">{filteredOffers.map(offer =>  offer['category'])[0]}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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