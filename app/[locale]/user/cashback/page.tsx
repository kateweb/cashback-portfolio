'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Select, SelectItem } from '@heroui/select';
import CustomDatepicker from '@/components/forms/CustomDatepicker';
import BalancesItems from '@/components/BalancesItems';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Status = 'available' | 'waiting' | 'declined';

interface CashbackItem {
  id: string;
  offer_name: string;
  amount: number;
  currency: string;
  status: Status;
  created_at: string;
  order_id: string;
}

const STATUS_CLASS: Record<Status, string> = {
  available: 'cashback-chip cashback-chip--available',
  waiting:   'cashback-chip cashback-chip--waiting',
  declined:  'cashback-chip cashback-chip--declined',
};

const Cashback = () => {
  const t = useTranslations('Cashback');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [refreshBalance] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [date, onChange] = useState<Value>(null);
  const [items, setItems] = useState<CashbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const statuses = [
    { key: 'available', label: t('status.available') },
    { key: 'waiting',   label: t('status.waiting') },
    { key: 'declined',  label: t('status.declined') },
  ];

  const fetchCashback = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: '1', limit: '20' });
    if (selectedStatus) params.set('status', selectedStatus);
    if (date instanceof Date) {
      const offset = date.getTimezoneOffset();
      const local = new Date(date.getTime() - offset * 60000);
      params.set('createdAt', local.toISOString().slice(0, 10));
    }
    try {
      const res = await fetchWithAuth(`/api/cashback/list?${params}`);
      if (!res) return;
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatus, date]);

  useEffect(() => {
    fetchCashback();
  }, [fetchCashback]);

  return (
    <Layout>
      <div className='my-5 sm:-mx-3 md:mx-5 dark-text-white'>
        <BalancesItems setAvailableBalance={setAvailableBalance} refresh={refreshBalance} />

        {/* Filters */}
        <div className='sm:flex justify-content-center cashback-form mt-4'>
          <Select
            label={t('status.title')}
            className='sm:max-w-xs mb-3 sm:m-3'
            selectedKeys={selectedStatus ? [selectedStatus] : []}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string ?? '';
              setSelectedStatus(val);
            }}
          >
            {statuses.map((s) => (
              <SelectItem key={s.key}>{s.label}</SelectItem>
            ))}
          </Select>
          <CustomDatepicker
            calendarAriaLabel={t('choose_date')}
            className='sm:max-w-xs w-full mb-3 sm:m-3'
            value={date}
            onChange={onChange}
          />
        </div>

        {/* Cashback list */}
        <div className='mx-auto max-w-[680px] px-1'>
          <h3 className='text-lg font-semibold mb-3 mt-2'>{t('list_title')}</h3>

          {isLoading ? (
            <div className='space-y-3'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='cashback-list-item animate-pulse rounded-xl h-16' />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className='text-center text-gray-500 py-8'>{t('no_items')}</p>
          ) : (
            <div className='space-y-2'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='cashback-list-item flex items-center justify-between rounded-xl px-4 py-3 shadow-sm'
                >
                  <div className='flex flex-col min-w-0'>
                    <span className='font-medium truncate'>{item.offer_name}</span>
                    <span className='text-xs text-gray-400 mt-0.5'>
                      {t('order_id')} #{item.order_id} · {item.created_at}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 ml-3 shrink-0'>
                    <span className='font-bold text-darkgreen whitespace-nowrap'>
                      +{item.amount} {item.currency.toUpperCase()}
                    </span>
                    <span className={STATUS_CLASS[item.status] ?? 'cashback-chip'}>
                      {t(`status.${item.status}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cashback;
