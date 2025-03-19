import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function usePagination<T>(
	fetchUrl: string,
	initialPage: number,
	initialPageSize: number,
	locale: string,
	dataKey: string,
	filters?: { createdAt?: string; offerId?: string }
) {
	const [data, setData] = useState<T[]>([]);
	const [totalResults, setTotalResults] = useState(0);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [postsPerPage, setPostsPerPage] = useState(initialPageSize);
	const [isMounted, setIsMounted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsMounted(true);
		const defaultPageSize = parseInt(Cookies.get("pageSize") || "10");
		setPostsPerPage(defaultPageSize);
	}, []);

	useEffect(() => {
		if (postsPerPage === null) return;
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const params = new URLSearchParams({
					page: currentPage.toString(),
					limit: postsPerPage.toString(),
					lang: locale,
					...(filters?.createdAt && { createdAt: filters.createdAt }),
					...(filters?.offerId && { offerId: filters.offerId }),
				});

				const url = `${fetchUrl}?${params.toString()}`;

				const response = await fetch(url);
				const responseData = await response.json();
				if (responseData[dataKey]) setData(responseData[dataKey]);

				setTotalResults(parseInt(responseData.total_count) || 0);

				if (totalResults > 0 && responseData.clicks?.length === 0) {
					setCurrentPage(1); // Prevents unnecessary re-fetches
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, postsPerPage, fetchUrl, locale, dataKey, filters]);

	const handlePageSizeChange = (newPageSize: number) => {
		setPostsPerPage(newPageSize);
		Cookies.set("pageSize", newPageSize.toString(), { expires: 30 });
	};

	return { data, totalResults, currentPage, postsPerPage, isMounted, isLoading, handlePageSizeChange };
}
