// components/BalancesItems.js
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Loader from '@/components/ui/Loader';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
  </svg>
);

const BalancesItems = ({ setAvailableBalance, refresh }) => {
  const [balances, setBalances] = useState({ waiting: 0, available: 0, currency: 'uah' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth('/api/balances');
        if (!response) return;
        const data = await response.json();
        if (response.ok) {
          const balanceData = {
            waiting: data[0].hold,
            available: data[0].paid,
            currency: data[0].currency,
          };
          setBalances(balanceData);
          if (setAvailableBalance) setAvailableBalance(balanceData.available);
        } else {
          setError(t('Cashback.failed'));
        }
      } catch {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchBalances();
  }, [t, setAvailableBalance, refresh]);

  if (error) return <div className='text-center my-3 text-red-400'>{error}</div>;

  const currency = t(`Cashback.${balances.currency}`);

  return (
    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
      {loading && <Loader />}

      {/* Pending card */}
      <div className='balance-card balance-card--waiting flex items-center gap-3 rounded-2xl px-5 py-4 shadow-sm border min-w-[220px]'>
        <div className='balance-icon balance-icon--waiting rounded-xl p-2'>
          <ClockIcon />
        </div>
        <div>
          <p className='text-xs font-medium opacity-70 mb-0.5'>{t('Cashback.waiting')}</p>
          <p className='text-xl font-bold'>
            {balances.waiting}
            <span className='text-sm font-normal ml-1'>{currency}</span>
          </p>
        </div>
      </div>

      {/* Available card */}
      <div className='balance-card balance-card--available flex items-center gap-3 rounded-2xl px-5 py-4 shadow-sm border min-w-[220px]'>
        <div className='balance-icon balance-icon--available rounded-xl p-2'>
          <WalletIcon />
        </div>
        <div>
          <p className='text-xs font-medium opacity-70 mb-0.5'>{t('Cashback.available')}</p>
          <p className='text-xl font-bold'>
            {balances.available}
            <span className='text-sm font-normal ml-1'>{currency}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalancesItems;
