// app/api/payment/list/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	try {
		const page = searchParams.get('page');
		const limit = searchParams.get('limit');
		const status = searchParams.get('status');
		const token = await getToken()
		if (!token) {
			return new NextResponse("Unauthorized", { status: 403 })
		}
		let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/list?page=${page}&limit=${limit}`;
		if (status) {
			apiUrl += `&status=${status}`; // Append status if it exists
		}
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch payments list: ${response.statusText}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching payments list:', error);
		return NextResponse.json({ error: 'Failed to fetch payments list' }, { status: 500 });
	}
}