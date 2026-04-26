'use client';

import {useTranslations} from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
import { useLocale } from 'use-intl';
import { useSession } from "next-auth/react";
import OfferButton from "@/components/offer/OfferButton";
import Loader from "@/components/ui/Loader";

const OfferPage = () => {
	const locale = useLocale();
	const [offer, setOffer] = useState(null);
	const t = useTranslations('Offer');
	const { data: session, status } = useSession();
	const isAuthorized = status === "authenticated";
	const { id } = useParams();

	useEffect(() => {
		const fetchOffer = async () => {
			try {
				const response = await fetch(`/api/offers/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'lang': locale,
					},
				});
				const data = await response.json();
				setOffer(data);
			} catch (error) {
				console.error('Error fetching offer:', error);
			}
		};

		fetchOffer();
	}, [id, locale]);


	if (!offer) {
		return <Loader/>
	}

	return (
		<div key={offer['id']} className='flex align-items-center flex-column'>
			<div className='top-block w-full my-6 md:my-10 mb-0'>
				<button onClick={() => window.history.back()}
								className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
					<svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
					</svg>
					{t('back_button')}
				</button>
				<h1 className="mx-auto text-center text-3xl font-bold dark-text-white">{offer['name']}</h1>
			</div>
			<div className='text-md my-4 text-gray-500'>{offer['category_name']}</div>
			<div className='w-48'>
				{offer['logoUrl'] ? <Image src={offer['logoUrl']} alt={offer['name']} className="offer-img mb-4 object-contain w-full" width={50} height={50} /> : <div className="cashback-empty-img w-full h-48 mb-4 object-contain"></div>}
			</div>
			{isAuthorized ? (
				<OfferButton offer={offer}/>
			) : ''}

			<Link key={offer['category_id']} href={`/${locale}/category/${offer['category_id']}`} className="hover-green bg-gray-50 border border-gray-300 text-gray-900 text-center rounded-full px-4 py-2 m-2 text-sm font-medium dark-bg-gray-700 dark-border-gray-600 dark-text-white">
				{offer['category_name']}
			</Link>
			{offer?.['cashbackInfo'] && (
				<div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
					<div className="flex flex-col space-y-1.5 p-6">{t('info')}</div>
					<div className='p-6 pt-0' dangerouslySetInnerHTML={{ __html: offer['cashbackInfo'] }} />
				</div>
			)}
			{offer?.['conditions'] && (
				<div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
					<div className="flex flex-col space-y-1.5 p-6">{t('conditions')}</div>
					<div className='p-6 pt-0' dangerouslySetInnerHTML={{ __html: offer['conditions'] }} />
				</div>
			)}
			{offer?.['description'] && (
				<div className='rounded-lg border bg-white dark-bg-gray-800 dark-border-transparent text-card-foreground shadow-sm mx-4 my-4 w-full max-w-screen-md dark-text-white'>
					<div className='p-6' dangerouslySetInnerHTML={{ __html: offer['description'] }} />
				</div>
			)}
		</div>

	);
};

export default OfferPage;