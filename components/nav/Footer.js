'use client';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="mt-auto py-7 dark-text-white">
      <div className="footer-wrap border-t border-divider border-dashed px-5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm pt-7">
          <div className="text-left dark:text-white">
            © 2012–2025 {t('title')}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a href="/user/agreement" className="text-link hover:underline">{t('agreement')}</a>
            <a href="#" className="text-link hover:underline">{t('cookie')}</a>
            <a href="#" className="text-link hover:underline">{t('policy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
