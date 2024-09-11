// app/components/LanguageSwitcher.tsx
'use client';

import {useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';
import {usePathname} from '@/i18n/routing';
import { useLocale } from '../contexts/LocaleContext';

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
    setLocale(newLocale);
    router.push(`/${newLocale}${pathname}`);
  };

  return (
    <select value={locale}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="language-dropdown bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <option value="uk">UA</option>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
