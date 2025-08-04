// app/api/offers/find/name//route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function POST(req: Request) {
	try {
		const { name: offerName } = await req.json();
		const token = await getToken()
		if (!token) {
			return new NextResponse("Unauthorized", { status: 403 })
		}
		let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers/find/name`;
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify({ name: offerName })
		});
		if (response.status === 401) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch offer name: ${response.statusText}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching offer name:', error);
		return NextResponse.json({ error: 'Failed to fetch offer name' }, { status: 500 });
	}
}