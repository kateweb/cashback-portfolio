// app/api/payment/cancel/route.ts
import {NextRequest, NextResponse} from 'next/server';
import { getToken } from "@/utils/getToken";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const token = await getToken()
	if (!token) {
		return new NextResponse("Unauthorized", { status: 403 })
	}
	try {
		const { id } = params;
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/balance/payment/cancel/${id}`;
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
		if (response.status === 401) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!response.ok) {
			throw new Error(`Backend error: ${response.statusText}`);
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error cancelling payment:', error);
		return NextResponse.json({ error: 'Failed to cancel payment' }, { status: 500 });
	}
}