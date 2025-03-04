'use client';

import {useTranslations} from 'next-intl';
import React from "react";
import { useState }  from "react";
import Link from 'next/link';
import Layout from '@/components/Layout';
import {useLocale} from '@/contexts/LocaleContext';
import CustomDatepicker from '@/components/forms/CustomDatepicker';
import Loader from "@/components/ui/Loader";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { usePagination } from '@/utils/paginationHook';
import Cookies from "js-cookie";

interface Click {
  id: number;
  offer_id: number;
  offer_name: string;
  sd_offer_id: number;
  affiliate_id: number;
  redirect_url: string;
  created_at: string;
}

interface HistoryProps {
  searchParams?: { [key: string]: string };
}
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const History = ({ searchParams = {}}: HistoryProps) => {
  const t = useTranslations('History');
  const { locale } = useLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [value, onChange] = useState<Value>(null);

  const currentPage = parseInt(searchParams.page || "1");
  const { data: fetchedClicks, totalResults, currentPage: currentPageState, postsPerPage, isMounted, handlePageSizeChange } = usePagination<Click>(
    '/api/history',
    currentPage,
    parseInt(Cookies.get("pageSize") || "10"),
    locale,
    'clicks'
  );
  if (!isMounted) return null;
  if (!fetchedClicks || fetchedClicks.length === 0) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className='m-auto mx-5 mb-4 mt-4 flex flex-col items-center justify-center'>
        <h2 className="text-center text-2xl dark-text-white">{t('title')}</h2>
      </div>
      <div className='dark-text-white max-w-500 -mx-3 md:mx-auto'>
        <div className='form-control m-3'>
          <label className='text-sm mb-1 block'>{t('search_by_date')}</label>
          <CustomDatepicker className="max-w-[240px] w-full transition-none" value={value} onChange={onChange} />
        </div>
        {Array.isArray(fetchedClicks) ? (
          fetchedClicks.map((click) => (
            <div className="history-item flex m-3" key={click.id}>
              <div className="w-3/4 mt-4">
                {click.created_at}
                <p className="text-green">{click.offer_name}</p>
              </div>
              <Link href={baseUrl+locale+`/user/disputs?offerId=${click.offer_id}&offerName=${click.offer_name}&date=${click.created_at.substring(0, 10)}`} className="m-2 history-btn btn-secondary hover-green inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
                {t('button_text')}
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>{t('all_clicks_error')}</p>
          </div>
        )}
        {fetchedClicks.length > 0 && postsPerPage !== null && (
          <PaginationWithLinks
            page={currentPageState}
            pageSize={postsPerPage}
            totalCount={totalResults}
            pageSizeSelectOptions={{
              pageSizeOptions: [5, 10, 25],
            }}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default History;