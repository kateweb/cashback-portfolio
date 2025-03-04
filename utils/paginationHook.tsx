import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function usePagination<T>(
	fetchUrl: string,
	initialPage: number,
	initialPageSize: number,
	locale: string,
	dataKey: string,
) {
	const [data, setData] = useState<T[]>([]);
	const [totalResults, setTotalResults] = useState(0);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [postsPerPage, setPostsPerPage] = useState(initialPageSize);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const defaultPageSize = parseInt(Cookies.get("pageSize") || "10");
		setPostsPerPage(defaultPageSize);
	}, []);

	useEffect(() => {
		if (postsPerPage === null) return;
		const fetchData = async () => {
			try {
				const response = await fetch(`${fetchUrl}${fetchUrl.includes('?') ? '&' : '?'}page=${currentPage}&limit=${postsPerPage}&lang=${locale}`);
				const responseData = await response.json();
				if (responseData[dataKey]) {
					setData(responseData[dataKey]);
				}
				setTotalResults(parseInt(responseData.total_count) || 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [currentPage, postsPerPage, fetchUrl, locale, dataKey]);

	const handlePageSizeChange = (newPageSize: number) => {
		setPostsPerPage(newPageSize);
		Cookies.set("pageSize", newPageSize.toString(), { expires: 30 });
	};

	return { data, totalResults, currentPage, postsPerPage, isMounted, handlePageSizeChange };
}
