import { NextResponse } from 'next/server';

type Locale = 'en' | 'uk' | 'ru';
type L10n = Record<Locale, string>;

const MOCK_CATEGORIES: { id: number; name: L10n }[] = [
  { id: 1,  name: { en: 'Electronics',   uk: 'Електроніка',      ru: 'Электроника'     } },
  { id: 2,  name: { en: 'Fashion',        uk: 'Мода',             ru: 'Мода'            } },
  { id: 3,  name: { en: 'Travel',         uk: 'Подорожі',         ru: 'Путешествия'     } },
  { id: 4,  name: { en: 'Beauty',         uk: 'Краса',            ru: 'Красота'         } },
  { id: 5,  name: { en: 'Sports',         uk: 'Спорт',            ru: 'Спорт'           } },
  { id: 6,  name: { en: 'Home & Garden',  uk: 'Дім і сад',        ru: 'Дом и сад'       } },
  { id: 7,  name: { en: 'Food & Drinks',  uk: 'Їжа та напої',     ru: 'Еда и напитки'   } },
  { id: 8,  name: { en: 'Health',         uk: 'Здоров\'я',        ru: 'Здоровье'        } },
];

export async function GET(req: Request) {
  const lang = (req.headers.get('lang') || 'uk') as Locale;
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/categories?locale=${lang}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.statusText}`);
    const categories = await response.json();
    if (Array.isArray(categories)) return NextResponse.json(categories);
  } catch {
    // fall through to mock
  }

  return NextResponse.json(
    MOCK_CATEGORIES.map(({ id, name }) => ({ id, name: name[lang] ?? name.en }))
  );
}
