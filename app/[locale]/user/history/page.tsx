'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLocale } from 'use-intl';
import CustomDatepicker from '@/components/forms/CustomDatepicker';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { usePagination } from '@/utils/paginationHook';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {Input} from "@heroui/input";
import { useRouter, usePathname } from 'next/navigation';
import { fetchWithAuth } from "@/utils/fetchWithAuth";

interface Click {
  id: number;
  offer_id: number;
  offer_name: string;
  created_at: string;
}

interface HistoryProps {
  searchParams?: { [key: string]: string };
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const History = ({ searchParams = {} }: HistoryProps) => {
  const t = useTranslations('History');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = parseInt(searchParams.page || '1');

  const [date, setDate] = useState<Value>(null);
  const [offerName, setOfferName] = useState('');
  const [offerId, setOfferId] = useState<string>(searchParams.offerId || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [offerIsEmpty, setOfferIsEmpty] = useState(false);

  const [searchParamsState, setSearchParamsState] = useState(() => ({
    createdAt: searchParams.createdAt || '',
    offerId: searchParams.offerId || '',
  }));

  const {
    data: fetchedClicks,
    totalResults,
    currentPage: currentPageState,
    postsPerPage,
    isMounted,
    handlePageSizeChange,
    isLoading,
  } = usePagination<Click>(
    '/api/history',
    currentPage,
    parseInt(Cookies.get('pageSize') || '10'),
    locale,
    'clicks',
    searchParamsState
  );

  // Update datepicker and offer name from URL on initial load
  useEffect(() => {
    if (searchParams.createdAt) setDate(new Date(searchParams.createdAt));
    if (searchParams.offerName) setOfferName(searchParams.offerName);
    if (searchParams.offerId) setOfferId(searchParams.offerId);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let createdAt = '';
      if (date instanceof Date) {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        createdAt = localDate.toISOString().slice(0, 19).replace('T', ' ');
      }

      setSearchParamsState((prev) => {
        if (prev.createdAt !== createdAt || prev.offerId !== offerId) {
          return { createdAt, offerId };
        }
        return prev;
      });
    }, 300); // Debounce time

    return () => clearTimeout(timer);
  }, [date, offerId]);

  const handleOfferNameChange = (value: string) => {
    setOfferName(value);
    if (value.length === 0) {
      setErrorMessage('');
      setOfferId('');
      setSearchParamsState((prev) => ({ ...prev, offerId: '' }));
      setOfferIsEmpty(false);
    } else if (value.length < 3) {
      setErrorMessage(t('search_offer_error'));
      setOfferId('');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (offerName.length < 3) return;

    const timer = setTimeout(async () => {
      const response = await fetchWithAuth('/api/offers/find/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: offerName }),
      });
      if (!response) return;
      const data = await response.json();
      if (data.length === 0) {
        setOfferIsEmpty(true);
        setOfferId('');
      } else {
        setOfferId(data[0].id);
        setOfferIsEmpty(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [offerName]);

  // Update URL when offer name, date, or offerId changes
  useEffect(() => {
    const query: Record<string, string> = {};
    if (currentPageState > 1) query.page = currentPageState.toString();
    if (offerName) query.offerName = offerName;
    if (searchParamsState.offerId) query.offerId = searchParamsState.offerId;
    if (searchParamsState.createdAt) query.createdAt = searchParamsState.createdAt;

    const queryString = new URLSearchParams(query).toString();
    const newUrl = `${pathname}?${queryString}`;

    if (window.location.search !== `?${queryString}`) {
      router.push(newUrl, { scroll: false });
    }
  }, [currentPageState, searchParamsState, offerName, pathname, router]);

  if (!isMounted) return null;
  return (
    <Layout>
      <div className='m-auto mx-5 mb-4 mt-4 flex flex-col items-center justify-center'>
        <h2 className='text-center text-2xl dark-text-white'>{t('title')}</h2>
      </div>
      <div className='dark-text-white max-w-[600px] mx-auto'>
        <div className='flex flex-col sm:flex-row items-start'>
          <div className='form-control me-3 sm:max-w-[50%] w-full'>
            <label className='text-sm mb-1 block'>{t('search_by_date')}</label>
            <CustomDatepicker
              className='w-full transition-none'
              value={date}
              onChange={setDate}
            />
          </div>

          <div className='form-control sm:max-w-[50%] w-full mt-3 sm:mt-0'>
            <label className='text-sm mb-1 block'>{t('search_by_offer')}</label>
            <Input
              type='text'
              className='input input-bordered w-full'
              value={offerName}
              onChange={(e) => handleOfferNameChange(e.target.value)}
              placeholder={t('search_by_offer')}
            />
            {errorMessage && <p className='text-red-500 text-xs'>{errorMessage}</p>}
          </div>
        </div>

        {isLoading ? (
          <div className='h-[100px]'>
            <Image
              src='/img/loader-grey.svg'
              alt='Loader'
              className='w-10 h-10 loader'
              width={50}
              height={50}
            />
          </div>
        ) : fetchedClicks && fetchedClicks.length > 0 && !offerIsEmpty ? (
          <>
            {fetchedClicks.map((click) => (
              <div className='history-item flex my-3' key={click.id}>
                <div className='w-3/4 mt-4'>
                  {click.created_at}
                  <p className='text-green'>{click.offer_name}</p>
                </div>
                <Link
                  href={`/${locale}/user/disputs?offerId=${click.offer_id}&offerName=${click.offer_name}&date=${click.created_at}`}
                  className='history-btn btn-secondary hover-green inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2'
                >
                  {t('button_text')}
                </Link>
              </div>
            ))}
            {postsPerPage !== null && (
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
          </>
        ) : (
          <div className='text-center'>
            <p className='mt-4'>{t('all_clicks_error')}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;