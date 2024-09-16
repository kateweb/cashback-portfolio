'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLocale } from '@/contexts/LocaleContext';

const Account = () => {
  const { locale } = useLocale();
  const t = useTranslations('Account');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='mx-auto my-4 max-w-max'>
        <p className="mb-2 text-md dark-text-white">{t('no_accounts')}</p>
        <Link href={baseUrl+locale+"/user/account/new"} className="m-2 mx-0 account-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          {t('add_account')}
        </Link>
      </div>
    </Layout>
  );
};

export default Account;