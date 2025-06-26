"use client"
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {useTranslations} from "next-intl";

export default function OfferButton({ offer }) {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const t = useTranslations('Offer');

	const handleClick = async () => {
		if (!session?.user.userId || !offer?.id) return;
		setLoading(true);
		try {
			const response = await fetch(`/api/offers/${offer.id}/get-rdr-link/${session.user.userId}`);
			if (response.ok) {
				const data = await response.json();
				const redirectUrl = data.redirectUrl;
				window.location.href = redirectUrl;
			} else {
				console.log('Failed to retrieve the redirect link');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<button
			onClick={handleClick}
			className="m-2 offer-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2"
			disabled={loading}
		>
			{loading ? t('loading') : t('button_text')}
		</button>
	);
}
