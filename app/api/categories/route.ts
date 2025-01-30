// app/api/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const lang = (req.headers.get('lang') || 'uk');
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/categories?locale=${lang}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
