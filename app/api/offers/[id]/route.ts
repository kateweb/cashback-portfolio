// app/api/offers/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const lang = (req.headers.get('lang') || 'uk') ;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}?locale=${lang}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch offer: ${response.statusText}`);
    }

    const offer = await response.json();
    return NextResponse.json(offer);
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json({ error: 'Failed to fetch offer' }, { status: 500 });
  }
}
