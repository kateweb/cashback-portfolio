'use client';
import {useTranslations} from 'next-intl';
import {useLocale} from "use-intl";

const Footer = () => {
  const t = useTranslations('Footer');
  const locale = useLocale();
  return (
    <footer className="mt-auto py-7 dark-text-white">
      <div className="footer-wrap border-t border-divider border-dashed px-5">
        <div className="footer-block flex flex-col justify-between items-center gap-4 text-sm pt-7">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-4">
            <a href={"/" + locale + "/static/agreement"}
               className="text-link hover:underline">{t('agreement')}</a>
            <a href={"/" + locale + "/static/user_agreement"}
               className="text-link hover:underline">{t('user_agreement')}</a>
            <a href={"/" + locale + "/static/personal_data"}
               className="text-link hover:underline">{t('personal_data')}</a>
            <a href={"/" + locale + "/static/marketing_consent"}
               className="text-link hover:underline">{t('marketing_consent')}</a>
            <a href={"/" + locale + "/static/controller_agreement"}
               className="text-link hover:underline">{t('controller_agreement')}</a>
            <a href={"/" + locale + "/static/cookie_files"}
               className="text-link hover:underline">{t('cookie')}</a>
            <a href={"/" + locale + "/static/policy"}
               className="text-link hover:underline">{t('policy')}</a>
          </div>
          <div className="text-left text-gray-500 dark-text-white">
            © 2012–2025 {t('title')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
