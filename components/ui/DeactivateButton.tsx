"use client"

import React from 'react';
import {useTranslations} from "next-intl";
import { toast } from 'react-toastify';
import {useLocale} from "@/contexts/LocaleContext";
import {useRouter} from "next/navigation";

const DeactivateButton = () => {
	const t = useTranslations('Settings');
	const router = useRouter();
	const { locale } = useLocale();
	const handleDelete = async () => {
		try {
			const token = localStorage.getItem('access_token');
			console.log(token);
			const response = await fetch('/api/auth/deactivate', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`
				},
			});
			if (response.ok) {
				toast.success(t('deactivated_successfully'));
				setTimeout(() => {
					router.push(`/${locale}/login`);
				}, 3000);
			} else {
				const errorData = await response.json();
				toast.error(errorData.errors);
			}
		} catch (error) {
			toast.error("Error during API request");
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="text-red-500 ms-2"
		>
			{t('link_text')}
		</button>
	);
};

export default DeactivateButton;
