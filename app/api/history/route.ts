import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

const MOCK_CLICKS = [
  { id: 1,  offer_id: 1,  offer_name: 'Amazon',      created_at: '2026-04-28 14:32:00' },
  { id: 2,  offer_id: 2,  offer_name: 'Nike',         created_at: '2026-04-27 09:15:00' },
  { id: 3,  offer_id: 3,  offer_name: 'Booking.com',  created_at: '2026-04-25 18:44:00' },
  { id: 4,  offer_id: 4,  offer_name: 'Sephora',      created_at: '2026-04-22 11:20:00' },
  { id: 5,  offer_id: 5,  offer_name: 'IKEA',         created_at: '2026-04-20 16:05:00' },
  { id: 6,  offer_id: 6,  offer_name: 'iHerb',        created_at: '2026-04-18 10:30:00' },
  { id: 7,  offer_id: 7,  offer_name: 'Zara',         created_at: '2026-04-15 13:55:00' },
  { id: 8,  offer_id: 8,  offer_name: 'Adidas',       created_at: '2026-04-12 08:40:00' },
  { id: 9,  offer_id: 9,  offer_name: 'Airbnb',       created_at: '2026-04-10 20:15:00' },
  { id: 10, offer_id: 10, offer_name: 'AliExpress',   created_at: '2026-04-07 15:00:00' },
  { id: 11, offer_id: 11, offer_name: 'Decathlon',    created_at: '2026-04-05 12:10:00' },
  { id: 12, offer_id: 12, offer_name: 'Uber Eats',    created_at: '2026-04-03 19:25:00' },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = await getToken();
  if (!token) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1') || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10') || 10));
    const createdAt = searchParams.get('createdAt');
    const offerId = searchParams.get('offerId');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (createdAt) params.set('createdAt', createdAt);
    if (offerId) params.set('offerId', offerId);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/clicks?${params}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) return new NextResponse("Unauthorized", { status: 401 });
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (Array.isArray(data?.clicks)) return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  let filtered = MOCK_CLICKS;
  const createdAt = searchParams.get('createdAt');
  const offerId = searchParams.get('offerId');
  if (createdAt) filtered = filtered.filter(c => c.created_at.startsWith(createdAt.slice(0, 10)));
  if (offerId) filtered = filtered.filter(c => String(c.offer_id) === offerId);

  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1') || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10') || 10));
  const from = (page - 1) * limit;

  return NextResponse.json({ clicks: filtered.slice(from, from + limit), total_count: filtered.length });
}
