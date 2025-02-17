import Layout from '@/components/Layout';
import Offers from "@/components/Offers";
import BackButton from "@/components/BackButton";

interface CategoryPageProps {
  params: {
    locale: string;
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

const CategoryPage = ({ searchParams, params }: CategoryPageProps) => {
  const { locale, id } = params;
  return (
    <Layout>
      <div className='top-block my-6 md:my-10'>
        <BackButton/>
      </div>
      <Offers searchParams={searchParams} categoryId={id} />
    </Layout>
  );
};

export default CategoryPage;