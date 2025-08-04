// app/api/history/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	try {
		const page = searchParams.get('page');
		const limit = searchParams.get('limit');
		const createdAt = searchParams.get('createdAt');
		const offerId = searchParams.get('offerId');
		const token = await getToken()

		if (!token) {
			return new NextResponse("Unauthorized", { status: 403 })
		}
		let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/clicks?page=${page}&limit=${limit}`;
		if (createdAt) {
			apiUrl += `&createdAt=${createdAt}`; // Append createdAt if it exists
		}
		if (offerId) {
			apiUrl += `&offerId=${offerId}`; // Append offerId if it exists
		}
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