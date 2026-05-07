import { NextResponse } from 'next/server';
import { getToken } from "@/utils/getToken";

const MOCK_SETTINGS = [
  { name: 'min_payment_limit',    value: '100' },
  { name: 'max_payment_limit',    value: '50000' },
  { name: 'payment_fee',          value: '0' },
  { name: 'income_tax_percent',   value: '18' },
  { name: 'military_tax_percent', value: '1.5' },
];

export async function GET() {
  const token = await getToken();
  if (!token) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/settings/list`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 401) return new NextResponse("Unauthorized", { status: 401 });
    if (!response.ok) throw new Error(`Backend error: ${response.statusText}`);
    const data = await response.json();
    if (Array.isArray(data)) return NextResponse.json(data);
  } catch {
    // fall through to mock
  }

  return NextResponse.json(MOCK_SETTINGS);
}
