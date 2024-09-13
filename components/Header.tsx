'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from '../contexts/LocaleContext';
import Dropdown from './Dropdown';

const Header = () => {
  const t = useTranslations('Nav');
  const { locale } = useLocale();

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
        <Link href={menuLink('faq')}>{t('faq')}</Link>
        <Link href={menuLink('rules')}>{t('rules')}</Link>
        <Link href={menuLink('help')}>{t('help')}</Link>
        <Link className="logout" href="/logout">{t('logout')}</Link>
      </nav>
    </div>
  );

  return (
    <header className="header border-b border-divider">
      <div className="logo text-2xl font-bold text-green-600">
        <Link href={"/"+locale}>
          <h1 className='d-flex align-items-center'>MoneyBack</h1>
        </Link>
      </div>
      <ThemeSwitcher/>
      <LanguageSwitcher/>
      <Dropdown main="User" inside={menuBlock} className="menu" />
    </header>
  );
};

export default Header;
