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
    <div className='faq my-5 mx-5 dark-text-white'>
      <div className='faq-item mb-10'>
        <h3 className="mb-4 font-bold text-md">{t('title')}</h3>
        <p className='text-md mb-4'>{t('subtitle')}</p>
        <ol className='ordered-list text-md'>
          {Array.from({ length: 5 }, (_, i) => {
            const itemNumber = i + 1;
            return (
              <li key={itemNumber}>
                {itemNumber === 1 ? (
                  <> {t(`faq_list.${itemNumber}`)} <Link href={baseUrl+locale}>{baseUrl+locale}</Link></>) 
                  : ( t(`faq_list.${itemNumber}`))}
              </li>
            );
          })}
        </ol>
      </div>
      <div className='faq-item mb-10'>
        <h3 className="mb-4 font-bold text-md">{t('title2')}</h3>
        <p className='text-md mb-4'>{t('subtitle2')}</p>
      </div>
      <div className='faq-item mb-10'>
        <h3 className="mb-4 font-bold text-md">{t('title3')}</h3>
        <ol className='ordered-list text-md mb-4'>
          {Array.from({ length: 7 }, (_, i) => {
            const itemNumber = i + 1;
            return (
              <li key={itemNumber}>
                {itemNumber === 1 ? (
                  <> {t(`faq_list3.${itemNumber}`)} <Link href={baseUrl+locale}>{baseUrl+locale}</Link></>) 
                  : ( t(`faq_list3.${itemNumber}`))}
              </li>
            );
          })}
        </ol>
        <p className='text-md mb-4'>{t('subtitle3')} <Link href={baseUrl+locale+"/help"}>{baseUrl+locale+"/help"}</Link></p>
      </div>
      <div className='faq-item mb-10'>
        <h3 className="mb-4 font-bold text-md">{t('title4')}</h3>
        <p className='text-md'>{t('subtitle4')} </p>
        <ul className='unordered-list text-md'>
          {Array.from({ length: 5 }, (_, i) => {
            const itemNumber = i + 1;
            return (
              <li key={itemNumber}>
                 {t(`faq_list4.${itemNumber}`)}
              </li>
            );
          })}
        </ul>
        <p className='text-md'>{t('subtitle5')} </p>
      </div>
      
    </div>
  </Layout>
  );
};

export default Faq;