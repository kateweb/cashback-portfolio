import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

const OfferFetcher = dynamic(() => import('@/components/offer/OfferFetcher'), { ssr: false });

const OfferPage = () => {
  return (
    <Layout>
      <OfferFetcher />
    </Layout>
  );
};

export default OfferPage;