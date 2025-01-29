"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocale } from "@/contexts/LocaleContext";
import {useTranslations} from 'next-intl';
import Image from "next/image";
import CashbackCard from "@/components/CashbackCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface Offer {
	id: string;
	cashbackInfo: string;
	cashbackPercent: number;
	category_name: string;
	logoUrl: string;
}
interface OffersProps {
	searchParams?: { [key: string]: string };
	categoryId?: string;
	title?: string;
}

const Offers = ({ searchParams = {}, categoryId, title }: OffersProps) => {
	const { locale } = useLocale();
	const t = useTranslations('Main');
	const [filteredOffers, setOffers] = useState<Offer[]>([]);
	const [totalResults, setTotalResults] = useState(0);
	const currentPage = parseInt(searchParams.page || "1");
	const [postsPerPage, setPostsPerPage] = useState<number>(10); // Default to 10
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Set page size after component is mounted to avoid SSR mismatch
		const defaultPageSize = parseInt(Cookies.get("pageSize") || searchParams.pageSize || "10");
		setPostsPerPage(defaultPageSize);
		setIsMounted(true);
	}, [searchParams.pageSize]);

	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const url = categoryId
					? `/api/offers?categoryId=${categoryId}&page=${currentPage}&limit=${postsPerPage}`
					: `/api/offers?page=${currentPage}&limit=${postsPerPage}`;

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						lang: locale,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				setTotalResults(parseInt(data.total_count) || 0);
				setOffers(Array.isArray(data.offers) ? data.offers : []);
			} catch (error) {
				console.error("Error fetching offers:", error);
			}
		};

		fetchOffers();
	}, [locale, currentPage, postsPerPage, categoryId]);

	const handlePageSizeChange = (newPageSize: number) => {
		setPostsPerPage(newPageSize);
		Cookies.set("pageSize", newPageSize.toString(), { expires: 30 }); // Храним 30 дней
	};

	if (!isMounted) {
		return null; // Avoid SSR mismatch during initial render
	}

	if (!filteredOffers) {
		return (
			<div className="overlay mt-5">
				<Image
					src="/img/loader.svg"
					alt="Loader"
					className="w-10 h-10 loader"
					width={50}
					height={50}
				/>
			</div>
		);
	}
	const dynamicTitle = categoryId ? (filteredOffers.length > 0 ? filteredOffers[0].category_name : "") : "";
	return (
		<>
			{dynamicTitle && (
				<h1 className="my-10 text-center text-3xl font-bold dark-text-white">
					{dynamicTitle}
				</h1>
			)}
			{Array.isArray(filteredOffers) ? (
				<div className="d-flex flex-wrap justify-content-center">
					{filteredOffers.map((offer) => (
						<CashbackCard
							id={offer.id}
							key={offer.cashbackInfo}
							brand={offer.cashbackInfo}
							cashback={offer.cashbackPercent}
							category={offer.category_name}
							imgUrl={offer.logoUrl}
						/>
					))}
				</div>
			) : (
				<div className="text-center text-danger">
					<p>{t('all_offers_error')}</p>
				</div>
			)}
			<PaginationWithLinks
				page={currentPage}
				pageSize={postsPerPage}
				totalCount={totalResults}
				pageSizeSelectOptions={{
					pageSizeOptions: [3, 5, 10, 25],
				}}
				onPageSizeChange={handlePageSizeChange}
			/>
		</>
	);
};

export default Offers;
