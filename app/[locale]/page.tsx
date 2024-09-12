"use client"

import {useTranslations} from 'next-intl';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Categories from '@/components/Categories';
import CashbackCard from '@/components/CashbackCard';
import { useLocale } from '@/contexts/LocaleContext';
import Image from 'next/image'


export default function Home() {
  const { locale } = useLocale();
  const [filteredOffers, setOffers] = useState([]);
  const t = useTranslations('Main');

  useEffect(() => {
    try {
      fetch('/api/offers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',       // For specifying JSON content
          'lang': locale,                  // Custom header for locale
        },
      })
      .then((res) => res.json())
      .then((data) => setOffers(data));
    } catch (error) {
      console.error('Error fetching offer:', error);
    }
  }, [locale]);

  if (!filteredOffers) {
    return <div className='overlay mt-5'><Image src="/img/loader.svg" alt="Loader" className="w-10 h-10 loader" width={50} height={50}/></div>; // Display a loading message or spinner while data is being fetched
  }
  
  return (
    <Layout>
      <h1 className="my-10 text-center text-3xl font-bold dark:text-white">{t('all_offers')}</h1>
      <Categories />
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
}
 