"use client";

import { useLocale } from "@/contexts/LocaleContext";
import {useTranslations} from 'next-intl';
import CashbackCard from "@/components/offer/CashbackCard";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { usePagination } from '@/utils/paginationHook';
import Loader from "@/components/ui/Loader";
import Cookies from "js-cookie";
import {useState} from "react";
import Categories from "@/components/Categories";

interface Offer {
	id: string;
	name: string;
	cashbackPercent: number;
	category_name: string;
	logoUrl: string;
}
interface OffersProps {
	searchParams?: { [key: string]: string };
	categoryId?: string;
}

const Offers = ({ searchParams = {}, categoryId }: OffersProps) => {
	const { locale } = useLocale();
	const t = useTranslations('Main');
	const currentPage = parseInt(searchParams.page || "1");
	const [searchParamsState, setSearchParamsState] = useState(() => ({
		categoryId: categoryId?.toString() || '',
	}));
	const { data: filteredOffers, totalResults, currentPage: currentPageState, postsPerPage, isMounted, handlePageSizeChange } = usePagination<Offer>(
		`/api/offers`,
		currentPage,
		parseInt(Cookies.get("pageSize") || "10"),
		locale,
		'offers',
		searchParamsState
	);

	if (!isMounted) {
		return null;
	}

	if (!filteredOffers) {
		return (
			<Loader/>
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
			{categoryId && <Categories />}
			{Array.isArray(filteredOffers) ? (
				<div className="d-flex flex-wrap justify-content-center">
					{filteredOffers.map((offer) => (
						<CashbackCard
							id={offer.id}
							key={offer.id}
							brand={offer.name}
							cashbackPercent={offer.cashbackPercent}
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
			{filteredOffers.length > 0 && postsPerPage !== null && (
				<PaginationWithLinks
					page={currentPage}
					pageSize={postsPerPage}
					totalCount={totalResults}
					pageSizeSelectOptions={{
						pageSizeOptions: [5, 10, 25],
					}}
					onPageSizeChange={handlePageSizeChange}
				/>
			)}
		</>
	);
};

export default Offers;
