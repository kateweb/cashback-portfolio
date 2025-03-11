// components/BalancesItems.js
'use client';

import React, { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';
import Loader from "@/components/ui/Loader";

const BalancesItems = () => {
	const [balances, setBalances] = useState({ waiting: 0, available: 0, currency: 'uah' });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const t = useTranslations();

	useEffect(() => {
		const fetchBalances = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/balances');
				const data = await response.json();

				if (response.ok) {
					setBalances({
						waiting: data[0].hold,
						available: data[0].paid,
						currency: data[0].currency
					});
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
	}, [t]);

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
