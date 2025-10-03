import Layout from '@/components/Layout';
import Offers from "@/components/offer/Offers";
import HomeButton from "@/components/ui/HomeButton";

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
        <HomeButton/>
      </div>
      <Offers searchParams={searchParams} categoryId={id} />
    </Layout>
  );
};

export default CategoryPage;