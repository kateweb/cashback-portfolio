// components/BalancesItems.js
'use client';

import React, { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';
import Loader from "@/components/ui/Loader";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const BalancesItems = ({ setAvailableBalance, refresh}) => {
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
						currency: data[0].currency
					};
					setBalances(balanceData);

					if (setAvailableBalance) {
						setAvailableBalance(balanceData.available);
					}
				} else {
					setError(t('Cashback.failed'));
				}
			} catch (error) {
				setError('Error fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchBalances();
	}, [t, setAvailableBalance, refresh]);

	if (error) return <div className='text-center my-3'>{error}</div>;

	return (
		<div className='sm:flex justify-content-center'>
			{loading && (
				<Loader/>
			)}
			<div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
				{t('Cashback.waiting') + " " + balances.waiting + " " + t(`Cashback.${balances.currency}`)}
			</div>
			<div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
				{t('Cashback.available') + " " + balances.available + " " + t(`Cashback.${balances.currency}`)}
			</div>
		</div>
	);
};

export default BalancesItems;
