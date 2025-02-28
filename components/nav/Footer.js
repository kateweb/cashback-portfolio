'use client';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="mt-auto p-2 pt-3">
      <div className="container">
        <div className="w-full text-center dark-text-white"> © 2012-2024 {t('title')} </div>
      </div>
    </footer>
  );
};

export default Footer;
