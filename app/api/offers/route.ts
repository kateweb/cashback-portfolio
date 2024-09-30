// app/api/offers/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('category'); 
  const lang = (req.headers.get('lang') || 'uk') as 'en' | 'uk' | 'ru';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const offers = {
    en: [
      { id:'1', brand: 'ARX', cashback: '12%', category: 'Insurance',categoryId:'1', imgUrl: baseUrl+'img/arx-logo.svg' },
      { id:'2', brand: 'ATL', cashback: '5%', category: 'Car Services Network', categoryId:'2', imgUrl: baseUrl+'img/atl-logo.svg' },
      { id:'3', brand: 'AVIC', cashback: '1.5%', category: 'Electronics', categoryId:'3', imgUrl: baseUrl+'img/avic-logo.svg' },
      { id:'4', brand: 'Bagland', cashback: '12.5%', category: 'Bags, Backpacks',categoryId:'6', imgUrl: baseUrl+'img/bagland-logo.svg' },
      { id:'5', brand: 'EcoFlow Ukraine', cashback: '3%', category: 'Electronics', categoryId:'3', imgUrl: baseUrl+'img/ecoflow-logo.svg' },
      { id:'6', brand: 'Finance.ua', cashback: '12.8%', category: 'Insurance',categoryId:'1', imgUrl: baseUrl+'img/finance-logo.svg' },
      { id:'7', brand: 'Must Have', cashback: '6%', category: 'Women clothes', categoryId:'4', imgUrl: baseUrl+'img/must-have-logo.svg' },
      { id:'8', brand: 'TK-Laser', cashback: 'up to 224 uah', category: 'Beauty and health',categoryId:'5', imgUrl: baseUrl+'img/tk-laser-logo.svg' },
    ],
    uk: [
      { id:'1', brand: 'ARX', cashback: '12%', category: 'Страхування',categoryId:'1', imgUrl: baseUrl+'img/arx-logo.svg' },
      { id:'2', brand: 'ATL', cashback: '5%', category: 'Мережа автосервісів', categoryId:'2', imgUrl: baseUrl+'img/atl-logo.svg' },
      { id:'3', brand: 'AVIC', cashback: '1.5%', category: 'Електроніка', categoryId:'3', imgUrl: baseUrl+'img/avic-logo.svg' },
      { id:'4', brand: 'Bagland', cashback: '12.5%', category: 'Сумки, рюкзаки',categoryId:'6', imgUrl: baseUrl+'img/bagland-logo.svg' },
      { id:'5', brand: 'EcoFlow Ukraine', cashback: '3%', category: 'Електроніка', categoryId:'3', imgUrl: baseUrl+'img/ecoflow-logo.svg' },
      { id:'6', brand: 'Finance.ua', cashback: '12.8%', category: 'Страхування',categoryId:'1', imgUrl: baseUrl+'img/finance-logo.svg' },
      { id:'7', brand: 'Must Have', cashback: '6%', category: 'Жіночий одяг', categoryId:'4', imgUrl: baseUrl+'img/must-have-logo.svg' },
      { id:'8', brand: 'TK-Laser', cashback: 'до 224 грн.', category: 'Краса та здоров\'я',categoryId:'5', imgUrl: baseUrl+'img/tk-laser-logo.svg' },
    ],
    ru: [
      { id:'1', brand: 'ARX', cashback: '12%', category: 'Страхование', categoryId:'1', imgUrl: baseUrl+'img/arx-logo.svg' },
      { id:'2', brand: 'ATL', cashback: '5%', category: 'Сеть автосервисов', categoryId:'2', imgUrl: baseUrl+'img/atl-logo.svg' },
      { id:'3', brand: 'AVIC', cashback: '1.5%', category: 'Электроника', categoryId:'3', imgUrl: baseUrl+'img/avic-logo.svg' },
      { id:'4', brand: 'Bagland', cashback: '12.5%', category: 'Сумки, рюкзаки',categoryId:'6', imgUrl: baseUrl+'img/bagland-logo.svg' },
      { id:'5', brand: 'EcoFlow Ukraine', cashback: '3%', category: 'Электроника', categoryId:'3', imgUrl: baseUrl+'img/ecoflow-logo.svg' },
      { id:'6', brand: 'Finance.ua', cashback: '12.8%', category: 'Страхование', categoryId:'1', imgUrl: baseUrl+'img/finance-logo.svg' },
      { id:'7', brand: 'Must Have', cashback: '6%', category: 'Женская одежда', categoryId:'4', imgUrl: baseUrl+'img/must-have-logo.svg' },
      { id:'8', brand: 'TK-Laser', cashback: 'до 224 грн.', category: 'Красота и здоровье',categoryId:'5', imgUrl: baseUrl+'img/tk-laser-logo.svg' },
    ]
  };
  // Get the array of offers based on the selected language
  const translatedOffers = offers[lang]; 

  // Filter offers by category if provided, otherwise return all offers
  const filteredOffers = categoryId 
    ? translatedOffers.filter((offer) => offer.categoryId == categoryId) 
    : translatedOffers;


  return NextResponse.json(filteredOffers);

}
