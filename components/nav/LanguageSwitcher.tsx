// app/components/LanguageSwitcher.tsx
'use client';
import {useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';
import {usePathname} from '@/i18n/routing';
import { useLocale } from '@/contexts/LocaleContext';
import Dropdown from './Dropdown';

export default function LanguageSwitcher() {
  const {locale} = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname or set a default (like 'uk')
  const currentLocale = pathname.split('/')[1] || 'uk';
  const [lang, setLocale] = useState(currentLocale); // default to current locale
  
  useEffect(() => {
    setLocale(lang);
  }, [lang]);
  
  const handleLocaleChange = (newLocale: string) => {
    const sendLocale = async () => {
      try {
        const response = await fetch(`/api/set-locale?locale=${newLocale}`, {
          method: 'PATCH',
        });
        await response.json();
        setLocale(newLocale);
        router.push(`/${newLocale}${pathname}`);
      } catch (error) {
        console.error('Error fetching set-locale:', error);
      }
    };
    sendLocale();
  };
  const mainInfo = (
    <>
      {locale.toUpperCase()}
      <svg className="ml-1 w-2 h-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
      </svg>
    </>
    );
    const languagesBlock = (
      <nav className="nav">
        <button onClick={() => handleLocaleChange('uk')}>UK</button>
        <button onClick={() => handleLocaleChange('ru')}>RU</button>
        <button onClick={() => handleLocaleChange('en')}>EN</button>
      </nav>
    );

  return (
    <Dropdown main={mainInfo} inside={languagesBlock} className="language" />
  );
}
