import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

const MOCK_PAYMENTS = [
  { id: 1, requested_amount: '150.00', income_tax_amount: '27.00', military_tax_amount: '2.25', amount_to_pay: '120.75', status: 1, created_at: '2026-04-20', exported: false },
  { id: 2, requested_amount: '200.00', income_tax_amount: '36.00', military_tax_amount: '3.00', amount_to_pay: '161.00', status: 0, created_at: '2026-04-28', exported: false },
  { id: 3, requested_amount: '100.00', income_tax_amount: '18.00', military_tax_amount: '1.50', amount_to_pay: '80.50',  status: 2, created_at: '2026-03-15', exported: true  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = await getToken();
  if (!token) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1') || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10') || 10));
    const status = searchParams.get('status');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (status) params.set('status', status);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/list?${params}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    if (response.status === 401) return new NextResponse("Unauthorized", { status: 401 });
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (Array.isArray(data?.offers)) return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  return NextResponse.json({ offers: MOCK_PAYMENTS, total_count: MOCK_PAYMENTS.length });
}
