'use client'
import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Pagination,
	Spinner,
	getKeyValue, Button,
} from "@heroui/react";
import {useTranslations} from "next-intl";
import {Badge} from "@heroui/badge";
import useSWR from "swr";
import {toast} from "react-toastify";
import {fetchWithAuth} from "@/utils/fetchWithAuth";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PaymentTable= ({refresh = false, onAfterCancel}) => {
	const t = useTranslations('Payout');
	const tc = useTranslations('Cashback');

	const [page, setPage] = React.useState(1);
	const rowsPerPage = 10;
	const {data, isLoading, mutate} = useSWR(`/api/payment/list?page=${page}&limit=${rowsPerPage}`, fetcher, {
		keepPreviousData: true,
	});

	const pages = React.useMemo(() => {
		return data?.total_count ? Math.ceil(data.total_count / rowsPerPage) : 0;
	}, [data?.total_count, rowsPerPage]);

	const loadingState = isLoading || data?.offers?.length === 0 ? "loading" : "idle";
	const handleCancelButton = (item) => {
		const cancelPayment = async () => {
			try {
				const response = await fetchWithAuth(`/api/payment/cancel/${item.id}`, {
					method: 'PATCH',
				});
				if (!response) return;
				let res = await response.json();
				if(res.error) {
					toast.error(t('table.cancel_error'));
				} else {
					toast.success(t('table.cancel_success'));
					mutate((currentData) => {
						if (!currentData) return currentData;
						return {
							...currentData,
							offers: currentData.offers.map((offer) =>
								offer.id === item.id ? {...offer, status: 2} : offer
							),
						};
					}, false);
					onAfterCancel?.();
				}
			} catch (error) {
				console.error('Error cancelling payment:', error);
			}
		};
		cancelPayment();
	};
	const getStatusDetails = (status) => {
		switch (status) {
			case 0:
				return { text: t('table.statuses.pending'), color: 'warning' };
			case 1:
				return { text: t('table.statuses.paid'), color: 'success' };
			case 2:
				return { text: t('table.statuses.rejected'), color: 'danger' };
			default:
				return { text: '', color: 'default' };
		}
	};
	const columnKeys = [
		'requested_amount',
		'income_tax_amount',
		'military_tax_amount',
		'amount_to_pay',
		'status',
		'created_at',
		'action'
	];
	return (
		<Table
			aria-label="Payments list table"
			bottomContent={
				pages > 0 ? (
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="primary"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				) : null
			}
		>

			<TableHeader>
				{columnKeys.map((key) => (
					<TableColumn key={key}>{t(`table.${key}`)}</TableColumn>
				))}
			</TableHeader>
			<TableBody
				items={data?.offers ?? []}
				loadingContent={<Spinner />}
				loadingState={loadingState}
			>
				{(item) => (
					<TableRow key={item?.name}>
						{columnKeys.map((columnKey, index) => (
							<TableCell key={columnKey} className="whitespace-nowrap">
								{columnKey === "status" ? (
										<Badge
											color={getStatusDetails(item[columnKey]).color}
											content={getStatusDetails(item[columnKey]).text}
											className="payment-badge"
											size="sm">
											<span></span>
										</Badge>
								) :
								columnKey === "action" ? (
									<Button
										isDisabled={item?.status !== 0 || item?.exported === true}
										variant="ghost"
										color="primary"
										size="sm"
										data-exported={item?.exported}
										onPress={() => handleCancelButton(item)}>
										{t('table.cancel')}
									</Button>
								) : index < 4 ? (
									`${getKeyValue(item, columnKey)} ${tc('uah')}`
								) : (
									getKeyValue(item, columnKey)
								)}
							</TableCell>
						))}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export default PaymentTable;