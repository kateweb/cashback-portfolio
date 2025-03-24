// app/api/payment/settings/list/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function GET() {
	const token = await getToken()
	if (!token) {
		return new NextResponse("Unauthorized", { status: 403 })
	}
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/settings/list`;
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Backend error: ${response.statusText}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching settings list:', error);
		return NextResponse.json({ error: 'Failed to fetch settings list' }, { status: 500 });
	}
}