import {useTranslations} from 'next-intl';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Settings = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  const t = useTranslations('Settings');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
        <p className="text-center text-lg dark-text-white">
          {t('title')} 
          <Link href={baseUrl+locale+"/user/settings/delete"} className="text-red-500 ms-2">{t('link_text')}</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Settings;