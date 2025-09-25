// utils/usePayoutReady.ts
import useSWR from 'swr';
const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export function usePayoutReady(isAuthorized:boolean){
	const {data: settings} = useSWR(
		isAuthorized ? '/api/payment/settings/list' : null, fetcher
	);
	const {data: balance}  = useSWR(
		isAuthorized ? '/api/balances' : null, fetcher
	);

	const min = Number(Object.fromEntries((settings||[]).map((i:any)=>[i.name,i.value]))['min_payment_limit'] ?? 0);
	const available =  Number(balance?.[0]?.paid ?? 0);

	return isAuthorized && min>0 && available>=min;
}