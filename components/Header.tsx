'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image'
import { useLocale } from '../contexts/LocaleContext';
import Dropdown from './Dropdown';
import { saveParamsToLocalStorage } from '@/utils/saveQueryParams'
import { useEffect } from 'react';

const Header = ({ isAuthorized }) => {
  const t = useTranslations('Nav');
  const { locale } = useLocale();

  useEffect(() => {
    saveParamsToLocalStorage();
  }, []);

  const menuLink = (href: string) => {
    return `/${locale}/${href}`;
  }
  
  const menuBlock = (
    <div>
      <div className="p-2 border-b border-divider">
        <p>Kate</p>
        <p className="user">k.burlachenko@treeum.net</p>
      </div>
      <nav className="nav">
        <Link href={menuLink('user/cashback')}>{t('cashback')}</Link>
        <Link href={menuLink('user/history')}>{t('history')}</Link>
        <Link href={menuLink('user/account')}>{t('account')}</Link>
        <Link href={menuLink('user/payout')}>
          {t('payments')} <span className="status dark-text-white">{t('available')}</span>
        </Link>
        <Link href={menuLink('user/settings')}>{t('settings')}</Link>
        <Link href={menuLink('user/faq')}>{t('faq')}</Link>
        <Link href={menuLink('user/rules')}>{t('rules')}</Link>
        <Link href={menuLink('user/help')}>{t('help')}</Link>
        <Link className="logout" href="/logout">{t('logout')}</Link>
      </nav>
    </div>
  );

  return (
    <header className="header border-b border-divider">
      <div className="logo">
        <Link href={"/"+locale}>
          <Image src="/img/logo.svg" alt="Moneyback" className="object-contain" width={200} height={78} />
        </Link>
      </div>
      <ThemeSwitcher/>
      <LanguageSwitcher/>
      {isAuthorized ? (
        <Dropdown main="User" inside={menuBlock} className="menu" />
      ) : (
        <Link href={"/"+locale+"/registration"} className='register-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium py-2 px-4'>
          {t('registration')}
        </Link>
      )}
    </header>
  );
};

export default Header;
