// app/api/pages/[slug]/route.ts
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
	const { slug } = params;
	const locale = req.headers.get("locale") || "uk";

	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`;

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'locale': locale,
			},
		});
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
