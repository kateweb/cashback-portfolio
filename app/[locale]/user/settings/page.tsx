import {useTranslations} from 'next-intl';
import Layout from '@/components/Layout';
import DeactivateButton from "@/components/ui/DeactivateButton";

const Settings = ({ params }: { params: { locale: string } }) => {
  const t = useTranslations('Settings');
  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
        <p className="text-center text-lg dark-text-white">
          {t('title')}
          <DeactivateButton />
        </p>
      </div>
    </Layout>
  );
};

export default Settings;