// app/[locale]/user/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from "@/components/Layout";
import {useTranslations} from "next-intl";
import DOMPurify from 'dompurify';
import Loader from "@/components/ui/Loader";

type PageData = {
	title: string;
	content: string;
};

const Page = () => {
	const t = useTranslations('Offer');
	const { slug } = useParams();
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (slug) {
			// Fetch the page data from the API
			fetch(`/api/pages/${slug}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						setError(data.error);
					} else {
						setPageData(data);
					}
				})
				.catch(() => setError('Failed to load page'));
		}
	}, [slug]);

	if (!pageData) return <Loader/>
	if (error) return <div className='text-center my-3'>{error}</div>;

	return (
		<Layout>
			<div className={`static-page my-5 mx-5 dark-text-white ${slug}`}>
				<h2 className="mb-4 font-bold text-xl">{pageData.title}</h2>
				<div className='text-md' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(pageData.content)}}/>
			</div>
		</Layout>
	);
};

export default Page;