import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";
import { MOCK_OFFERS, localizeOffer } from '@/app/api/offers/_mock';

export async function POST(req: Request) {
  const { name: offerName } = await req.json();
  const token = await getToken();
  if (!token) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/offers/find/name`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name: offerName }),
    });
    if (response.status === 401) return new NextResponse("Unauthorized", { status: 401 });
    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  const query = (offerName ?? '').toLowerCase().trim();
  const matches = MOCK_OFFERS
    .filter(o => o.name.toLowerCase().includes(query))
    .map(o => ({ id: o.id, name: o.name }));

  return NextResponse.json(matches);
}
