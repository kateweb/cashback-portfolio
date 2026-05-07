import { NextRequest, NextResponse } from 'next/server';
import { MOCK_OFFERS, localizeOffer } from '../_mock';

type Locale = 'en' | 'uk' | 'ru';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const lang = (req.headers.get('lang') || 'uk') as Locale;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}?locale=${lang}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch offer: ${response.statusText}`);
    const offer = await response.json();
    if (offer?.id) return NextResponse.json(offer);
  } catch {
    // fall through to mock
  }

  const mock = MOCK_OFFERS.find((o) => o.id === id);
  if (!mock) return NextResponse.json({ error: 'Offer not found' }, { status: 404 });

  return NextResponse.json(localizeOffer(mock, lang));
}
