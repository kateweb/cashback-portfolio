// app/api/offers/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const categoryId = searchParams.get('categoryId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const lang = (req.headers.get('lang') || 'uk');

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers?locale=${lang}${categoryId ? `&categoryId=${categoryId}` : ''}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch offers: ${response.statusText}`);
    }

    const filteredOffers = await response.json();

    return NextResponse.json(filteredOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }

}
