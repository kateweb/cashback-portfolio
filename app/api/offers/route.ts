import { NextResponse } from 'next/server';
import { MOCK_OFFERS, localizeOffer, type MockOffer } from './_mock';

type Locale = 'en' | 'uk' | 'ru';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = (req.headers.get('lang') || searchParams.get('lang') || 'uk') as Locale;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const categoryId = searchParams.get('categoryId');

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers?locale=${lang}${categoryId ? `&categoryId=${categoryId}` : ''}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch offers: ${response.statusText}`);
    const data = await response.json();
    if (Array.isArray(data?.offers)) return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  const filtered: MockOffer[] = categoryId
    ? MOCK_OFFERS.filter((o) => o.categoryId === parseInt(categoryId))
    : MOCK_OFFERS;

  const from = (page - 1) * limit;
  const paginated = filtered.slice(from, from + limit).map((o) => localizeOffer(o, lang));

  return NextResponse.json({ offers: paginated, total_count: filtered.length });
}
