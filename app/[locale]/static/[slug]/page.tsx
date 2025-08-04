// app/[locale]/static/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import Layout from "@/components/Layout";
import {useTranslations} from "next-intl";
import DOMPurify from 'dompurify';
import Loader from "@/components/ui/Loader";
import {fetchWithAuth} from "@/utils/fetchWithAuth";

type PageData = {
	title: string;
	content: string;
};

if (typeof window !== 'undefined') {
	DOMPurify.addHook('afterSanitizeAttributes', (node) => {
		if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
			node.setAttribute('rel', 'noopener noreferrer');
		}
	});
}

const Page = () => {
	const t = useTranslations('Offer');
	const { slug, locale } = useParams() as { slug: string; locale: string };
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!slug || !locale) return;

		const fetchData = async () => {
			try {
				// Set locale from url
				await fetch(`/api/set-locale?locale=${locale}`, {
					method: 'PATCH',
				});
				// Get page
				const res = await fetchWithAuth(`/api/pages/${slug}`);
				if (!res) return;
				if(res.status == 403) {
					router.push(`/${locale}/login`);
				}
				const data = await res.json();

				if (data.error) {
					setError(data.error);
				} else {
					setPageData(data);
				}
			} catch (err) {
				setError('Failed to load page');
			}
		};
		fetchData();
	}, [slug, locale]);

	useEffect(() => {
		const container = document.querySelector('.static-page');
		if (!container) return;

		container.querySelectorAll('table').forEach((table) => {
			if (!table.parentElement?.classList.contains('table-wrapper')) {
				const wrapper = document.createElement('div');
				wrapper.className = 'table-wrapper overflow-auto';
				table.parentNode?.insertBefore(wrapper, table);
				wrapper.appendChild(table);
			}
		});
	}, [pageData]);

	if (!pageData) return <Loader/>
	if (error) return <div className='text-center my-3'>{error}</div>;

	const sanitizedContent = DOMPurify.sanitize(pageData.content, {
		ADD_ATTR: ['target', 'rel'],
	});

	return (
		<Layout>
			<div className={`static-page my-5 mx-5 dark-text-white ${slug}`}>
				<h2 className="mb-4 font-bold text-xl">{pageData.title}</h2>
				<div className='text-md' dangerouslySetInnerHTML={{ __html: sanitizedContent }}/>
			</div>
		</Layout>
	);
};

export default Page;