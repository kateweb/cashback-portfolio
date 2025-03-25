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
	getKeyValue,
} from "@heroui/react";
import {useTranslations} from "next-intl";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PaymentTable= () => {
	const t = useTranslations('Payout');
	const [page, setPage] = React.useState(1);

	const {data, isLoading} = "";

	const rowsPerPage = 10;

	const pages = React.useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
	}, [data?.count, rowsPerPage]);

	const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

	return (
		<Table
			aria-label="Example table with client async pagination"
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
				<TableColumn key="ordered_amount">{t('table.ordered_amount')}</TableColumn>
				<TableColumn key="ndfl_amount">{t('table.ndfl_amount')}</TableColumn>
				<TableColumn key="vs_amount">{t('table.vs_amount')}</TableColumn>
				<TableColumn key="amount_to_paid">{t('table.amount_to_paid')}</TableColumn>
				<TableColumn key="status">{t('table.status')}</TableColumn>
				<TableColumn key="date">{t('table.date')}</TableColumn>
				<TableColumn key="action">{t('table.action')}</TableColumn>
			</TableHeader>
			<TableBody
				items={data?.results ?? []}
				loadingContent={<Spinner />}
				loadingState={loadingState}
			>
				{(item) => (
					<TableRow key={item?.name}>
						{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export default PaymentTable;