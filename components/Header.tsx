'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useState } from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import styles from './styles/Header.module.css'
import Image from 'next/image'
import { useLocale } from '../contexts/LocaleContext';

const Header = () => {
  const t = useTranslations('Nav');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {locale} = useLocale();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <header className="header border-b border-divider">
      <div className="logo text-2xl font-bold text-green-600">
      <Link href={"/"+locale}>
        <h1 className='d-flex align-items-center'>
          <Image
            src="/img/logo.svg"
            alt="Logo"
            className="w-10 h-10 mr-1"
            width={50}
            height={50}/>
            back</h1>
        </Link>
      </div>
      <ThemeSwitcher/>
      <LanguageSwitcher/>
      <div className="user-menu">
        <button onClick={toggleDropdown} className="user-button bg-gray-50 border border-gray-300 text-gray-900 hover-green dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <span className="flex h-full w-full items-center justify-center bg-muted">User</span>
        </button>
        {dropdownOpen && (
          <div data-side="bottom" className="dropdown  animate-in slide-in-from-top dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <div className="p-2 border-b border-divider">
              <p>Kate</p>
              <p className={styles.user}>k.burlachenko@treeum.net</p>
            </div>
            <nav className={styles.nav}>
              <Link href={locale+"/cashback"}>{t('cashback')}</Link>
              <Link href={locale+"/history"}>{t('history')}</Link>
              <Link href={locale+"/account"}>{t('account')}</Link>
              <Link href={locale+"/payments"}>
                {t('payments')} <span className="status">{t('available')}</span>
              </Link>
              <Link href={locale+"/settings"}>{t('settings')}</Link>
              <Link href={locale+"/faq"}>{t('faq')}</Link>
              <Link href={locale+"/rules"}>{t('rules')}</Link>
              <Link href={locale+"/help"}>{t('help')}</Link>
              <Link className="logout" href="/logout">{t('logout')}</Link>
            </nav>
          </div>
        )}
      </div> 
    </header>
  );
};

export default Header;
