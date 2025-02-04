import {useTranslations} from 'next-intl';
import Layout from '@/components/Layout';

const Confirmation = () => {
  const t = useTranslations('Confirmation');

  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
        <h1 className="mb-5 text-center text-lg dark-text-white">{t('text')}</h1>
      </div>
    </Layout>
  );
};

export default Confirmation;