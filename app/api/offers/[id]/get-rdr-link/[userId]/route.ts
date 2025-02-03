// app/api/offers/[id]/get-rdr-link/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string; userId: string } }) {
	try {
		const { id, userId } = params;
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}/get-rdr-link/${userId}`;
		console.log(apiUrl);
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(response);
		if (!response.ok) {
			throw new Error(`Failed to fetch redirect link from backend: ${response.statusText}`);
		}
		const data = await response.json();
		console.log({data})
		const redirectUrl = data.link;
		console.log({ redirectUrl });
		return NextResponse.json({ redirectUrl });
	} catch (error) {
		console.error('Error fetching redirect URL:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
