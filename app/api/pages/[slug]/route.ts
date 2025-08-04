// app/api/pages/[slug]/route.ts
import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

export async function GET(req, { params }) {
	const { slug } = params;
	const token = await getToken()
	if (!token) {
		return new NextResponse("Unauthorized", { status: 403 })
	}
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`;

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
			throw new Error(`Failed to fetch page: ${response.statusText}`);
		}

		const pageData = await response.json();

		// If the page data doesn't exist or is empty, return an error
		if (!pageData || Object.keys(pageData).length === 0) {
			return NextResponse.json({ error: 'Page not found' }, { status: 404 });
		}

		return NextResponse.json(pageData);
	} catch (error) {
		console.error('Error fetching page:', error);
		return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
	}
}
