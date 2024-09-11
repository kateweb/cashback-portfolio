// app/api/offers/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const lang = (req.headers.get('lang') || 'uk') as 'en' | 'uk' | 'ru';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const offers = {
    en: [
      { id:'1', brand: 'ARX', cashback: '12%', category: 'Insurance',categoryId:'1', imgUrl: baseUrl+'img/arx-logo.svg'},
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
  const offersInfo = {
    en: 
      {
        link: 'https://go.salesdoubler.net/in/offer/2769?aid=104559&tid3=cm0p0w72r0000l40cnyqihqa7',
        info: '<p><span>8%</span><span class="mx-2">- Paid order (OSCPV)</span></p><p><span>8%</span ><span class="mx-2">- Paid order (Green Card)</span></p><p><span>14%</span><span class="mx-2">- Paid order (Travel insurance)</span></p>',
        conditions: '<div>Cashback accrual time after purchase - 1 dayCashback will be available before crediting - from 15 to 30 days (or faster if payment is processed by the advertiser)<br><br>PROGRAM FEATURES:Cashback is charged for orders from all corners of Ukraine</div>',
        text: '<div>ARX Insurance Company is part of the international Canadian insurance group Fairfax Financial Holdings. The ARX website (arx.com.ua) is the official website of the ARX insurance company, which offers a variety of insurance products in Ukraine. The company specializes in providing insurance services including car insurance, home insurance, health insurance and travel insurance. The website offers a user-friendly interface for buying insurance policies online and also contains information about the company and its services. </div>'
      }
    ,
    uk: 
      {
        link: 'https://go.salesdoubler.net/in/offer/2769?aid=104559&tid3=cm0p0w72r0000l40cnyqihqa7',
        info: '<p><span>8%</span><span class="mx-2">-Оплачене замовлення (ОСЦПВ)</span></p><p><span>8%</span><span class="mx-2">-Оплачене замовлення (Зелена Карта)</span></p><p><span>14%</span><span class="mx-2">-Оплачене замовлення (Туристичне страхування)</span></p>',
        conditions: '<div>Час нарахування кешбеку після покупки  - 1 деньКешбек буде доступний до зарахування  - від 15 до 30 днів (або швидше за умови опрацювання виплати зі сторони рекламодавця)<br><br>ОСОБЛИВОСТІ ПРОГРАМИ:Кешбек нараховується за замовлення з усіх куточків України</div>',
        text: '<div>Страхова компанія ARX – частина міжнародної канадської страхової групи Fairfax Financial Holdings. 	Сайт ARX (arx.com.ua) є офіційною веб-сторінкою страхової компанії ARX, яка пропонує різноманітні страхові продукти в Україні. Компанія спеціалізується на наданні страхових послуг, включаючи автомобільне страхування, страхування житла, медичне страхування, а також страхування для подорожей. Веб-сайт пропонує зручний інтерфейс для покупки страхових полісів онлайн, а також містить інформацію про компанію та її послуги. </div>'
      }
    ,
    ru: 
      { link: 'https://go.salesdoubler.net/in/offer/2769?aid=104559&tid3=cm0p0w72r0000l40cnyqihqa7',
        info: '<p><span>8%</span><span class="mx-2">-Оплаченный заказ (ОСГПО)</span></p><p><span>8%</span ><span class="mx-2">-Оплаченный заказ (Зеленая Карта)</span></p><p><span>14%</span><span class="mx-2">-Оплаченный заказ (Туристическое страхование)</span></p>',
        conditions: '<div>Время начисления кэшбека после покупки - 1 деньКешбек будет доступен до зачисления - от 15 до 30 дней (или быстрее при условии обработки выплаты со стороны рекламодателя)<br><br>ОСОБЕННОСТИ ПРОГРАММЫ:Кешбек начисляется за заказ из всех уголков Украины</div>',
        text: '<div>Страховая компания ARX – часть международной канадской страховой группы Fairfax Financial Holdings. Сайт ARX (arx.com.ua) является официальной веб-страницы страховой компании ARX, которая предлагает разнообразные страховые продукты в Украине. Компания специализируется на предоставлении страховых услуг, включая автомобильное страхование, страхование жилья, медицинское страхование, а также страхование для путешествий. Веб-сайт предлагает удобный интерфейс для покупки страховых полисов онлайн, а также содержит информацию о компании и услугах. </div>'
      }
    
  }
  // Get the array of offers based on the selected language
  const translatedOffers = offers[lang]; // Fallback to 'en' if the language is not found

  // Filter offers by category if provided, otherwise return all offers
  const offerInfo = translatedOffers.filter(offer => offer.id == id)

  return NextResponse.json({...offerInfo[0], ...offersInfo[lang]});

}
