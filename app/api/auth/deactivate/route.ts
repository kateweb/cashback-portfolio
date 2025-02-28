import axios from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
	try {
		const token = request.headers.get('Authorization')
		console.log({token});
		if (!token) {
			return new NextResponse(
				JSON.stringify({ success: false, error: 'Authorization header is missing' }),
				{ status: 401 }
			);
		}
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/deactivate`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		} else {
			return new Response(
				JSON.stringify({ success: false, errors: response.data.errors }),
				{ status: response.status }
			);
		}
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				success: false,
				errors: error.response?.data?.message || [{ general: 'Server error' }],
			}),
			{ status: error.response?.status || 500 }
		);
	}
}
