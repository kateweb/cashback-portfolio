"use client"

import {useTranslations} from 'next-intl';
import Layout from '@/components/Layout';
import Categories from '@/components/Categories';
import Offers from "@/components/Offers";

interface HomeProps {
  searchParams: {[key: string]: string};
}
export default function Home({ searchParams}: HomeProps) {
  const t = useTranslations('Main');

  return (
    <Layout>
      <h1 className="my-10 text-center text-3xl font-bold dark-text-white">
        {t('all_offers')}
      </h1>
      <Categories/>
      <Offers searchParams={searchParams}/>
    </Layout>
  );
}
 