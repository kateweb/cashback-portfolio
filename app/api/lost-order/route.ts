// app/api/lost-order/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const token = await getToken()

		if (!token) {
			return new NextResponse("Unauthorized", {status: 403})
		}
		let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lost-order`;

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			body: formData
		});
		if (response.status === 401) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error Response:', errorData);
			throw new Error(`${JSON.stringify(errorData.errors)}`);
		}
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching to create lost order request:', error);
		let errorMessage: string;
		if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			errorMessage = JSON.stringify(error);
		}
		return NextResponse.json({errors: errorMessage}, {status: 500});
	}
}
