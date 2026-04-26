// app/api/history/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	try {
		const page = Math.max(1, parseInt(searchParams.get('page') ?? '1') || 1);
		const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10') || 10));
		const createdAt = searchParams.get('createdAt');
		const offerId = searchParams.get('offerId');
		const token = await getToken()

		if (!token) {
			return new NextResponse("Unauthorized", { status: 403 })
		}

		const params = new URLSearchParams({ page: String(page), limit: String(limit) });
		if (createdAt) params.set('createdAt', createdAt);
		if (offerId) params.set('offerId', offerId);
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/clicks?${params}`;
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (response.status === 401) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch history: ${response.statusText}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching history:', error);
		return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
	}
}