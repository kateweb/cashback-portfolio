// app/api/offers/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const lang = (req.headers.get('lang') || 'uk');
    console.log(searchParams)
    console.log(page, limit, lang);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers?locale=${lang}${categoryId ? `&categoryId=${categoryId}` : ''}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(apiUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch offers: ${response.statusText}`);
    }

    const filteredOffers = await response.json();
    console.log(filteredOffers)

    return NextResponse.json(filteredOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }

}
