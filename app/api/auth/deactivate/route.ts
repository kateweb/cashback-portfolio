import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function DELETE(request: Request) {
	const token = await getToken()
	if (!token) {
		return new NextResponse("Unauthorized", { status: 403 })
	}
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/deactivate`;
		const response = await fetch(apiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Backend error: ${response.statusText}`);
		}
		return new NextResponse(null, { status: 200 });
	} catch (error) {
		console.error('Error fetching api:', error);
		return new NextResponse(null, { status: 500 });
	}
}
