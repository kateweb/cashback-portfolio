"use client"

import React from 'react';
import {useTranslations} from "next-intl";
import { toast } from 'react-toastify';
import {useLocale} from "@/contexts/LocaleContext";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const DeactivateButton = () => {
	const t = useTranslations('Settings');
	const router = useRouter();
	const { locale } = useLocale();
	const handleLogout = async () => {
		await signOut({
			redirect: false,
		});
		router.push(`/${locale}/login`); // Redirect to login page
	};
	const handleDelete = async () => {
		try {
			const response = await fetchWithAuth('/api/auth/deactivate', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response) return;
			if (response.status === 200) {
				toast.success(t('deactivated_successfully'));
				setTimeout(async () => {
					await handleLogout();
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
