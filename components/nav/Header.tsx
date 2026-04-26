'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import LogoutButton from './LogoutButton';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image'
import { useLocale } from 'use-intl';
import Dropdown from './Dropdown';
import { saveParamsToLocalStorage } from '@/utils/saveQueryParams'
import { useEffect } from 'react';
import { useSession } from "next-auth/react";

import { signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import {usePayoutReady} from "@/utils/usePayoutReady";

const Header = () => {
  const t = useTranslations('Nav');
  const { data: session, status } = useSession();
  const isAuthorized = status === "authenticated";
  const locale = useLocale();
  const payoutReady = usePayoutReady(isAuthorized);

  useEffect(() => {
    if (isAuthorized && session?.user?.jwt) {
      try {
        const decoded: any = jwtDecode(session.user.jwt);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          console.warn("JWT expired. Signing out...");
          signOut({ callbackUrl: `/${locale}/login` });
        }
      } catch (e) {
        console.error("JWT invalid. Signing out...");
        signOut({ callbackUrl: `/${locale}/login` });
      }
    }
  }, [session, status, locale]);

  useEffect(() => {
    saveParamsToLocalStorage();
  }, []);

  const menuLink = (href: string) => {
    return `/${locale}/${href}`;
  }
  
  const menuBlock = (
    <div>
      <div className="p-2 border-b border-divider">
          {isAuthorized && session?.user?.email ? (
              <p className="user">{session.user.email}</p>
          ) : ""}
      </div>
      <nav className="nav">
        <Link href={menuLink('user/cashback')}>{t('cashback')}</Link>
        <Link href={menuLink('user/history')}>{t('history')}</Link>
        <Link href={menuLink('user/payout')}>
          {t('payments')} <span className={`status dark-text-white ml-2 ${payoutReady ? 'status-on' : 'status-off'}`}></span>
        </Link>
        <Link href={menuLink('user/settings')}>{t('settings')}</Link>
        <Link href={menuLink('static/faq')}>{t('faq')}</Link>
        <Link href={menuLink('static/rules')}>{t('rules')}</Link>
        <Link href={menuLink('user/help')}>{t('help')}</Link>
        <LogoutButton/>
      </nav>
    </div>
  );

  return (
    <header className="header border-b border-divider">
      <div className="logo">
        <Link href={"/"+locale}>
          <Image src="/img/logo.svg" alt="Multiback" className="object-contain" width={300} height={112} priority />
        </Link>
      </div>
      <ThemeSwitcher/>
      <LanguageSwitcher/>
      {isAuthorized ? (
        <Dropdown main="User" inside={menuBlock} className="menu" />
      ) : (
        <div className="d-flex nav-btns">
          <Link href={"/"+locale+"/registration"} className='nav-btn register-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium py-2 px-4'>
            {t('registration')}
          </Link>
          <Link href={"/"+locale+"/login"} className='nav-btn login-btn ms-2 btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium py-2 px-4'>
            {t('login')}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
