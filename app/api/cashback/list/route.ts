import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

type Status = 'available' | 'waiting' | 'declined';

const MOCK_CASHBACK = [
  { id: '1',  offer_name: 'Amazon',      amount: 12.50, currency: 'USD', status: 'available' as Status, created_at: '2026-04-28', order_id: 'ORD-00128' },
  { id: '2',  offer_name: 'Nike',        amount: 8.75,  currency: 'USD', status: 'available' as Status, created_at: '2026-04-25', order_id: 'ORD-00125' },
  { id: '3',  offer_name: 'Booking.com', amount: 15.20, currency: 'USD', status: 'waiting'   as Status, created_at: '2026-04-22', order_id: 'ORD-00122' },
  { id: '4',  offer_name: 'Sephora',     amount: 6.40,  currency: 'USD', status: 'available' as Status, created_at: '2026-04-20', order_id: 'ORD-00120' },
  { id: '5',  offer_name: 'IKEA',        amount: 9.60,  currency: 'USD', status: 'waiting'   as Status, created_at: '2026-04-18', order_id: 'ORD-00118' },
  { id: '6',  offer_name: 'iHerb',       amount: 22.10, currency: 'USD', status: 'available' as Status, created_at: '2026-04-15', order_id: 'ORD-00115' },
  { id: '7',  offer_name: 'Zara',        amount: 5.30,  currency: 'USD', status: 'declined'  as Status, created_at: '2026-04-13', order_id: 'ORD-00113' },
  { id: '8',  offer_name: 'Adidas',      amount: 11.40, currency: 'USD', status: 'available' as Status, created_at: '2026-04-10', order_id: 'ORD-00110' },
  { id: '9',  offer_name: 'Airbnb',      amount: 31.80, currency: 'USD', status: 'waiting'   as Status, created_at: '2026-04-07', order_id: 'ORD-00107' },
  { id: '10', offer_name: 'AliExpress',  amount: 3.20,  currency: 'USD', status: 'declined'  as Status, created_at: '2026-04-05', order_id: 'ORD-00105' },
  { id: '11', offer_name: 'Decathlon',   amount: 7.50,  currency: 'USD', status: 'available' as Status, created_at: '2026-04-02', order_id: 'ORD-00102' },
  { id: '12', offer_name: 'Uber Eats',   amount: 4.90,  currency: 'USD', status: 'available' as Status, created_at: '2026-03-30', order_id: 'ORD-00099' },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = await getToken();
  if (!token) return new NextResponse('Unauthorized', { status: 403 });

  const status = searchParams.get('status');
  const createdAt = searchParams.get('createdAt');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/cashback/list?${searchParams}`;
    const response = await fetch(apiUrl, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (Array.isArray(data?.items)) return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  let filtered = MOCK_CASHBACK;
  if (status) filtered = filtered.filter((i) => i.status === status);
  if (createdAt) filtered = filtered.filter((i) => i.created_at.startsWith(createdAt.slice(0, 10)));

  const from = (page - 1) * limit;
  return NextResponse.json({
    items: filtered.slice(from, from + limit),
    total_count: filtered.length,
  });
}
