// app/api/set-locale/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function PATCH(req: Request) {
	const token = await getToken()
	if (!token) {
		return new NextResponse("Unauthorized", { status: 403 })
	}
	try {
		const url = new URL(req.url);
		const lang = url.searchParams.get('locale') || 'uk';
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/set-locale?locale=${lang}`;
		const response = await fetch(apiUrl, {
			method: 'PATCH',
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
		console.error('Error fetching set-locale:', error);
		return NextResponse.json({ error: 'Failed to fetch set-locale' }, { status: 500 });
	}
}