const BRAND_LOGOS: Record<string, string> = {
  Amazon:      '/img/amazon-logo.svg',
  Samsung:     '/img/samsung-logo.svg',
  Apple:       '/img/apple-logo.svg',
  Nike:        '/img/nike-logo.svg',
  Zara:        '/img/zara-logo.svg',
  'H&M':       '/img/hm-logo.svg',
  Adidas:      '/img/adidas-logo.svg',
  'Booking.com': '/img/booking-logo.svg',
  Airbnb:      '/img/airbnb-logo.svg',
  Sephora:     '/img/sephora-logo.svg',
  iHerb:       '/img/iherb-logo.svg',
  IKEA:        '/img/ikea-logo.svg',
  'Uber Eats': '/img/ubereats-logo.svg',
  AliExpress:  '/img/aliexpress-logo.svg',
  Decathlon:   '/img/decathlon-logo.svg',
  Notino:      '/img/notino-logo.svg',
  Rozetka:     '/img/rozetka-logo.svg',
  Prom:        '/img/prom-logo.svg',
};

function avatar(name: string) {
  return BRAND_LOGOS[name] ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=16a34a&color=fff&bold=true`;
}

type Locale = 'en' | 'uk' | 'ru';
type L10n = Record<Locale, string>;

export type MockOffer = {
  id: string;
  name: string;
  cashbackPercent: number;
  category_name: L10n;
  category_id: number;
  categoryId: number;
  logoUrl: string;
  cashbackInfo: L10n;
  conditions: L10n;
  description: L10n;
};

export type LocalizedOffer = Omit<MockOffer, 'category_name' | 'cashbackInfo' | 'conditions' | 'description'> & {
  category_name: string;
  cashbackInfo: string;
  conditions: string;
  description: string;
};

export function localizeOffer(offer: MockOffer, locale: Locale): LocalizedOffer {
  const l = (f: L10n) => f[locale] ?? f.en;
  return {
    ...offer,
    category_name: l(offer.category_name),
    cashbackInfo: l(offer.cashbackInfo),
    conditions: l(offer.conditions),
    description: l(offer.description),
  };
}

export const MOCK_OFFERS: MockOffer[] = [
  {
    id: '1', name: 'Amazon', cashbackPercent: 3,
    category_id: 1, categoryId: 1,
    logoUrl: avatar('Amazon'),
    category_name: {
      en: 'Electronics',
      uk: 'Електроніка',
      ru: 'Электроника',
    },
    cashbackInfo: {
      en: '<p>Get <strong>3% cashback</strong> on all eligible purchases at Amazon, including electronics, books, household goods and more.</p>',
      uk: '<p>Отримуйте <strong>3% кешбек</strong> на всі покупки в Amazon, включаючи електроніку, книги, товари для дому та багато іншого.</p>',
      ru: '<p>Получайте <strong>3% кешбэк</strong> на все покупки в Amazon, включая электронику, книги, товары для дома и многое другое.</p>',
    },
    conditions: {
      en: '<ul><li>Cashback is credited within 30 days after order confirmation</li><li>Excludes gift cards, digital content and third-party sellers</li><li>Minimum order amount: $10</li></ul>',
      uk: '<ul><li>Кешбек нараховується протягом 30 днів після підтвердження замовлення</li><li>Не поширюється на подарункові картки, цифровий контент та сторонніх продавців</li><li>Мінімальна сума замовлення: $10</li></ul>',
      ru: '<ul><li>Кешбэк начисляется в течение 30 дней после подтверждения заказа</li><li>Не распространяется на подарочные карты, цифровой контент и сторонних продавцов</li><li>Минимальная сумма заказа: $10</li></ul>',
    },
    description: {
      en: '<p>Amazon is the world\'s largest online retailer. Shop millions of products across every category with fast delivery and easy returns.</p>',
      uk: '<p>Amazon — найбільший інтернет-магазин у світі. Мільйони товарів у всіх категоріях із швидкою доставкою та зручним поверненням.</p>',
      ru: '<p>Amazon — крупнейший интернет-магазин в мире. Миллионы товаров во всех категориях с быстрой доставкой и удобным возвратом.</p>',
    },
  },
  {
    id: '2', name: 'Samsung', cashbackPercent: 5,
    category_id: 1, categoryId: 1,
    logoUrl: avatar('Samsung'),
    category_name: { en: 'Electronics', uk: 'Електроніка', ru: 'Электроника' },
    cashbackInfo: {
      en: '<p>Earn <strong>5% cashback</strong> on Samsung smartphones, TVs, home appliances and accessories from the official store.</p>',
      uk: '<p>Отримуйте <strong>5% кешбек</strong> на смартфони, телевізори, побутову техніку та аксесуари Samsung в офіційному магазині.</p>',
      ru: '<p>Получайте <strong>5% кешбэк</strong> на смартфоны, телевизоры, бытовую технику и аксессуары Samsung в официальном магазине.</p>',
    },
    conditions: {
      en: '<ul><li>Cashback applies to purchases from Samsung official website only</li><li>Excludes repairs and service plans</li><li>Credited within 45 days of delivery</li></ul>',
      uk: '<ul><li>Кешбек поширюється лише на покупки на офіційному сайті Samsung</li><li>Не включає ремонт та сервісні плани</li><li>Нараховується протягом 45 днів після доставки</li></ul>',
      ru: '<ul><li>Кешбэк распространяется только на покупки на официальном сайте Samsung</li><li>Не включает ремонт и сервисные планы</li><li>Начисляется в течение 45 дней после доставки</li></ul>',
    },
    description: {
      en: '<p>Samsung is a global leader in technology, producing innovative smartphones, televisions, home appliances and semiconductor solutions.</p>',
      uk: '<p>Samsung — світовий лідер у технологіях, який виробляє інноваційні смартфони, телевізори, побутову техніку та напівпровідникові рішення.</p>',
      ru: '<p>Samsung — мировой лидер в технологиях, производящий инновационные смартфоны, телевизоры, бытовую технику и полупроводниковые решения.</p>',
    },
  },
  {
    id: '3', name: 'Apple', cashbackPercent: 2,
    category_id: 1, categoryId: 1,
    logoUrl: avatar('Apple'),
    category_name: { en: 'Electronics', uk: 'Електроніка', ru: 'Электроника' },
    cashbackInfo: {
      en: '<p>Earn <strong>2% cashback</strong> on iPhone, iPad, Mac, Apple Watch and accessories purchased through the Apple Store.</p>',
      uk: '<p>Отримуйте <strong>2% кешбек</strong> на iPhone, iPad, Mac, Apple Watch та аксесуари, придбані через Apple Store.</p>',
      ru: '<p>Получайте <strong>2% кешбэк</strong> на iPhone, iPad, Mac, Apple Watch и аксессуары, приобретённые через Apple Store.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for Apple Store online purchases only</li><li>Excludes AppleCare+ and App Store purchases</li><li>Cashback credited within 60 days</li></ul>',
      uk: '<ul><li>Тільки для онлайн-покупок у Apple Store</li><li>Не поширюється на AppleCare+ та покупки в App Store</li><li>Кешбек нараховується протягом 60 днів</li></ul>',
      ru: '<ul><li>Только для онлайн-покупок в Apple Store</li><li>Не распространяется на AppleCare+ и покупки в App Store</li><li>Кешбэк начисляется в течение 60 дней</li></ul>',
    },
    description: {
      en: '<p>Apple designs and sells consumer electronics, software, and online services. Known for iPhone, Mac, iPad and the Apple ecosystem.</p>',
      uk: '<p>Apple розробляє та продає споживчу електроніку, програмне забезпечення та онлайн-сервіси. Відома завдяки iPhone, Mac, iPad та екосистемі Apple.</p>',
      ru: '<p>Apple разрабатывает и продаёт потребительскую электронику, программное обеспечение и онлайн-сервисы. Известна благодаря iPhone, Mac, iPad и экосистеме Apple.</p>',
    },
  },
  {
    id: '4', name: 'Nike', cashbackPercent: 7,
    category_id: 2, categoryId: 2,
    logoUrl: avatar('Nike'),
    category_name: { en: 'Fashion', uk: 'Мода', ru: 'Мода' },
    cashbackInfo: {
      en: '<p>Get <strong>7% cashback</strong> on Nike footwear, apparel and sports accessories from the official Nike store.</p>',
      uk: '<p>Отримуйте <strong>7% кешбек</strong> на взуття, одяг та спортивні аксесуари Nike в офіційному магазині.</p>',
      ru: '<p>Получайте <strong>7% кешбэк</strong> на обувь, одежду и спортивные аксессуары Nike в официальном магазине.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for full-price items only — sale items excluded</li><li>Nike Member account required</li><li>Cashback confirmed after 14-day return window</li></ul>',
      uk: '<ul><li>Тільки для товарів за повною ціною — товари зі знижкою виключено</li><li>Потрібен акаунт Nike Member</li><li>Кешбек підтверджується після 14-денного вікна повернення</li></ul>',
      ru: '<ul><li>Только для товаров по полной цене — товары со скидкой исключены</li><li>Требуется аккаунт Nike Member</li><li>Кешбэк подтверждается после 14-дневного окна возврата</li></ul>',
    },
    description: {
      en: '<p>Nike is the world\'s leading designer, marketer, and distributor of athletic footwear, apparel, equipment and accessories.</p>',
      uk: '<p>Nike — провідний світовий дизайнер, маркетолог та дистриб\'ютор спортивного взуття, одягу, обладнання та аксесуарів.</p>',
      ru: '<p>Nike — ведущий мировой дизайнер, маркетолог и дистрибьютор спортивной обуви, одежды, оборудования и аксессуаров.</p>',
    },
  },
  {
    id: '5', name: 'Zara', cashbackPercent: 5,
    category_id: 2, categoryId: 2,
    logoUrl: avatar('Zara'),
    category_name: { en: 'Fashion', uk: 'Мода', ru: 'Мода' },
    cashbackInfo: {
      en: '<p>Earn <strong>5% cashback</strong> on all Zara clothing, accessories and footwear for men, women and kids.</p>',
      uk: '<p>Отримуйте <strong>5% кешбек</strong> на весь одяг, аксесуари та взуття Zara для чоловіків, жінок та дітей.</p>',
      ru: '<p>Получайте <strong>5% кешбэк</strong> на всю одежду, аксессуары и обувь Zara для мужчин, женщин и детей.</p>',
    },
    conditions: {
      en: '<ul><li>Excludes items already on sale</li><li>Cashback not applicable on gift cards</li><li>Credited within 30 days after purchase confirmation</li></ul>',
      uk: '<ul><li>Не поширюється на товари, що вже продаються зі знижкою</li><li>Кешбек не застосовується до подарункових карток</li><li>Нараховується протягом 30 днів після підтвердження покупки</li></ul>',
      ru: '<ul><li>Не распространяется на товары, уже продающиеся со скидкой</li><li>Кешбэк не применяется к подарочным картам</li><li>Начисляется в течение 30 дней после подтверждения покупки</li></ul>',
    },
    description: {
      en: '<p>Zara is a Spanish fast-fashion retailer offering stylish clothing and accessories at accessible prices, with new collections arriving weekly.</p>',
      uk: '<p>Zara — іспанський ритейлер швидкої моди, що пропонує стильний одяг та аксесуари за доступними цінами. Нові колекції надходять щотижня.</p>',
      ru: '<p>Zara — испанский ритейлер быстрой моды, предлагающий стильную одежду и аксессуары по доступным ценам. Новые коллекции поступают еженедельно.</p>',
    },
  },
  {
    id: '6', name: 'H&M', cashbackPercent: 4,
    category_id: 2, categoryId: 2,
    logoUrl: avatar('H&M'),
    category_name: { en: 'Fashion', uk: 'Мода', ru: 'Мода' },
    cashbackInfo: {
      en: '<p>Get <strong>4% cashback</strong> on fashion for the whole family — clothing, accessories, beauty and homeware at H&M.</p>',
      uk: '<p>Отримуйте <strong>4% кешбек</strong> на модний одяг для всієї родини — одяг, аксесуари, засоби краси та товари для дому в H&M.</p>',
      ru: '<p>Получайте <strong>4% кешбэк</strong> на модную одежду для всей семьи — одежду, аксессуары, косметику и товары для дома в H&M.</p>',
    },
    conditions: {
      en: '<ul><li>Valid on full-price purchases only</li><li>H&M Member loyalty points still apply</li><li>Cashback credited within 30 days of order dispatch</li></ul>',
      uk: '<ul><li>Діє лише на покупки за повною ціною</li><li>Бали лояльності H&M Member продовжують нараховуватись</li><li>Кешбек зараховується протягом 30 днів після відправлення замовлення</li></ul>',
      ru: '<ul><li>Действует только на покупки по полной цене</li><li>Баллы лояльности H&M Member продолжают начисляться</li><li>Кешбэк зачисляется в течение 30 дней после отправки заказа</li></ul>',
    },
    description: {
      en: '<p>H&M is a global fashion brand offering affordable, trend-forward clothing for men, women, teens and children.</p>',
      uk: '<p>H&M — глобальний бренд моди, що пропонує доступний та трендовий одяг для чоловіків, жінок, підлітків та дітей.</p>',
      ru: '<p>H&M — глобальный бренд моды, предлагающий доступную и трендовую одежду для мужчин, женщин, подростков и детей.</p>',
    },
  },
  {
    id: '7', name: 'Adidas', cashbackPercent: 6,
    category_id: 5, categoryId: 5,
    logoUrl: avatar('Adidas'),
    category_name: { en: 'Sports', uk: 'Спорт', ru: 'Спорт' },
    cashbackInfo: {
      en: '<p>Earn <strong>6% cashback</strong> on Adidas sneakers, sportswear and accessories ordered from the official Adidas website.</p>',
      uk: '<p>Отримуйте <strong>6% кешбек</strong> на кросівки, спортивний одяг та аксесуари Adidas з офіційного сайту.</p>',
      ru: '<p>Получайте <strong>6% кешбэк</strong> на кроссовки, спортивную одежду и аксессуары Adidas с официального сайта.</p>',
    },
    conditions: {
      en: '<ul><li>Applies to full-price items only</li><li>Excludes Yeezy collaborations</li><li>Cashback confirmed after 30-day return period</li></ul>',
      uk: '<ul><li>Поширюється лише на товари за повною ціною</li><li>Не включає колаборації Yeezy</li><li>Кешбек підтверджується після 30-денного терміну повернення</li></ul>',
      ru: '<ul><li>Распространяется только на товары по полной цене</li><li>Не включает коллаборации Yeezy</li><li>Кешбэк подтверждается после 30-дневного периода возврата</li></ul>',
    },
    description: {
      en: '<p>Adidas is a multinational sportswear company producing athletic footwear, clothing and equipment worn by athletes worldwide.</p>',
      uk: '<p>Adidas — транснаціональна компанія зі спортивного одягу, що виробляє спортивне взуття, одяг та обладнання для спортсменів по всьому світу.</p>',
      ru: '<p>Adidas — транснациональная компания спортивной одежды, производящая спортивную обувь, одежду и оборудование для спортсменов по всему миру.</p>',
    },
  },
  {
    id: '8', name: 'Booking.com', cashbackPercent: 4,
    category_id: 3, categoryId: 3,
    logoUrl: avatar('Booking'),
    category_name: { en: 'Travel', uk: 'Подорожі', ru: 'Путешествия' },
    cashbackInfo: {
      en: '<p>Receive <strong>4% cashback</strong> on hotel, apartment and accommodation bookings made through Booking.com.</p>',
      uk: '<p>Отримуйте <strong>4% кешбек</strong> на бронювання готелів, апартаментів та житла через Booking.com.</p>',
      ru: '<p>Получайте <strong>4% кешбэк</strong> на бронирование отелей, апартаментов и жилья через Booking.com.</p>',
    },
    conditions: {
      en: '<ul><li>Cashback applies to completed and paid stays only</li><li>Excludes non-refundable bookings cancelled after check-in</li><li>Credited 30 days after check-out</li></ul>',
      uk: '<ul><li>Кешбек нараховується лише за завершені та оплачені перебування</li><li>Не поширюється на невідшкодовувані бронювання, скасовані після заселення</li><li>Зараховується через 30 днів після виїзду</li></ul>',
      ru: '<ul><li>Кешбэк начисляется только за завершённые и оплаченные проживания</li><li>Не распространяется на невозвратные бронирования, отменённые после заселения</li><li>Зачисляется через 30 дней после выезда</li></ul>',
    },
    description: {
      en: '<p>Booking.com is one of the world\'s largest travel marketplaces, offering over 28 million accommodation listings in 228 countries.</p>',
      uk: '<p>Booking.com — один із найбільших у світі туристичних маркетплейсів із понад 28 мільйонами варіантів проживання у 228 країнах.</p>',
      ru: '<p>Booking.com — один из крупнейших в мире туристических маркетплейсов с более чем 28 миллионами вариантов жилья в 228 странах.</p>',
    },
  },
  {
    id: '9', name: 'Airbnb', cashbackPercent: 6,
    category_id: 3, categoryId: 3,
    logoUrl: avatar('Airbnb'),
    category_name: { en: 'Travel', uk: 'Подорожі', ru: 'Путешествия' },
    cashbackInfo: {
      en: '<p>Get <strong>6% cashback</strong> on Airbnb stays, experiences and adventure bookings worldwide.</p>',
      uk: '<p>Отримуйте <strong>6% кешбек</strong> на бронювання житла, вражень та пригод через Airbnb по всьому світу.</p>',
      ru: '<p>Получайте <strong>6% кешбэк</strong> на бронирование жилья, впечатлений и приключений через Airbnb по всему миру.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for completed stays only</li><li>Cashback credited 7 days after check-out</li><li>Excludes service fees</li></ul>',
      uk: '<ul><li>Діє лише для завершених перебувань</li><li>Кешбек зараховується через 7 днів після виїзду</li><li>Не включає сервісні збори</li></ul>',
      ru: '<ul><li>Действует только для завершённых проживаний</li><li>Кешбэк зачисляется через 7 дней после выезда</li><li>Не включает сервисные сборы</li></ul>',
    },
    description: {
      en: '<p>Airbnb is an online marketplace for lodging, homestays, and tourism experiences, connecting hosts with travellers in 220+ countries.</p>',
      uk: '<p>Airbnb — онлайн-маркетплейс для проживання, оренди житла та туристичних вражень, що поєднує господарів та мандрівників у 220+ країнах.</p>',
      ru: '<p>Airbnb — онлайн-маркетплейс для проживания, аренды жилья и туристических впечатлений, соединяющий хозяев и путешественников в 220+ странах.</p>',
    },
  },
  {
    id: '10', name: 'Sephora', cashbackPercent: 8,
    category_id: 4, categoryId: 4,
    logoUrl: avatar('Sephora'),
    category_name: { en: 'Beauty', uk: 'Краса', ru: 'Красота' },
    cashbackInfo: {
      en: '<p>Earn <strong>8% cashback</strong> on makeup, skincare, fragrance and hair care from top brands at Sephora.</p>',
      uk: '<p>Отримуйте <strong>8% кешбек</strong> на косметику, догляд за шкірою, парфуми та засоби для волосся від топових брендів у Sephora.</p>',
      ru: '<p>Получайте <strong>8% кешбэк</strong> на косметику, уход за кожей, парфюмерию и средства для волос от топовых брендов в Sephora.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for online purchases only</li><li>Excludes limited-edition sets and gift cards</li><li>Cashback credited within 21 days of delivery</li></ul>',
      uk: '<ul><li>Діє лише для онлайн-покупок</li><li>Не поширюється на лімітовані набори та подарункові картки</li><li>Кешбек нараховується протягом 21 дня після доставки</li></ul>',
      ru: '<ul><li>Действует только для онлайн-покупок</li><li>Не распространяется на лимитированные наборы и подарочные карты</li><li>Кешбэк начисляется в течение 21 дня после доставки</li></ul>',
    },
    description: {
      en: '<p>Sephora is a leading beauty retailer carrying over 340 brands across makeup, skincare, fragrance, nail, hair, and beauty tools.</p>',
      uk: '<p>Sephora — провідний ритейлер краси з більш ніж 340 брендами косметики, догляду за шкірою, парфумерії, лаків, засобів для волосся та інструментів краси.</p>',
      ru: '<p>Sephora — ведущий ритейлер красоты с более чем 340 брендами косметики, ухода за кожей, парфюмерии, лаков, средств для волос и инструментов красоты.</p>',
    },
  },
  {
    id: '11', name: 'iHerb', cashbackPercent: 10,
    category_id: 8, categoryId: 8,
    logoUrl: avatar('iHerb'),
    category_name: { en: 'Health', uk: 'Здоров\'я', ru: 'Здоровье' },
    cashbackInfo: {
      en: '<p>Get <strong>10% cashback</strong> on vitamins, supplements, natural health products and organic food at iHerb.</p>',
      uk: '<p>Отримуйте <strong>10% кешбек</strong> на вітаміни, харчові добавки, натуральні продукти для здоров\'я та органічне харчування в iHerb.</p>',
      ru: '<p>Получайте <strong>10% кешбэк</strong> на витамины, пищевые добавки, натуральные продукты для здоровья и органическое питание в iHerb.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for all product categories</li><li>Applies to first and repeat orders</li><li>Cashback credited within 14 days of delivery</li></ul>',
      uk: '<ul><li>Поширюється на всі категорії товарів</li><li>Діє на перші та повторні замовлення</li><li>Кешбек нараховується протягом 14 днів після доставки</li></ul>',
      ru: '<ul><li>Распространяется на все категории товаров</li><li>Действует на первые и повторные заказы</li><li>Кешбэк начисляется в течение 14 дней после доставки</li></ul>',
    },
    description: {
      en: '<p>iHerb is a leading online retailer of vitamins, supplements, health foods and natural personal care products with worldwide shipping.</p>',
      uk: '<p>iHerb — провідний онлайн-ритейлер вітамінів, харчових добавок, корисних продуктів харчування та натуральних засобів особистої гігієни з доставкою по всьому світу.</p>',
      ru: '<p>iHerb — ведущий онлайн-ритейлер витаминов, пищевых добавок, полезных продуктов питания и натуральных средств личной гигиены с доставкой по всему миру.</p>',
    },
  },
  {
    id: '12', name: 'IKEA', cashbackPercent: 4,
    category_id: 6, categoryId: 6,
    logoUrl: avatar('IKEA'),
    category_name: { en: 'Home & Garden', uk: 'Дім і сад', ru: 'Дом и сад' },
    cashbackInfo: {
      en: '<p>Earn <strong>4% cashback</strong> on furniture, home accessories and kitchen items from IKEA online store.</p>',
      uk: '<p>Отримуйте <strong>4% кешбек</strong> на меблі, аксесуари для дому та кухонні товари в онлайн-магазині IKEA.</p>',
      ru: '<p>Получайте <strong>4% кешбэк</strong> на мебель, аксессуары для дома и кухонные товары в онлайн-магазине IKEA.</p>',
    },
    conditions: {
      en: '<ul><li>Online orders only — excludes in-store purchases</li><li>Excludes IKEA Family card discounts from the cashback base</li><li>Credited within 45 days of delivery</li></ul>',
      uk: '<ul><li>Лише онлайн-замовлення — покупки в магазині не враховуються</li><li>Знижки картки IKEA Family виключені з бази нарахування кешбека</li><li>Зараховується протягом 45 днів після доставки</li></ul>',
      ru: '<ul><li>Только онлайн-заказы — покупки в магазине не учитываются</li><li>Скидки по карте IKEA Family исключены из базы начисления кешбэка</li><li>Зачисляется в течение 45 дней после доставки</li></ul>',
    },
    description: {
      en: '<p>IKEA is the world\'s largest furniture retailer, known for its Scandinavian-style, ready-to-assemble furniture at affordable prices.</p>',
      uk: '<p>IKEA — найбільший у світі меблевий ритейлер, відомий скандинавським стилем та меблями для самостійного складання за доступними цінами.</p>',
      ru: '<p>IKEA — крупнейший в мире мебельный ритейлер, известный скандинавским стилем и мебелью для самостоятельной сборки по доступным ценам.</p>',
    },
  },
  {
    id: '13', name: 'Uber Eats', cashbackPercent: 7,
    category_id: 7, categoryId: 7,
    logoUrl: avatar('Uber Eats'),
    category_name: { en: 'Food & Drinks', uk: 'Їжа та напої', ru: 'Еда и напитки' },
    cashbackInfo: {
      en: '<p>Get <strong>7% cashback</strong> on food delivery orders placed through Uber Eats from local restaurants and cafes.</p>',
      uk: '<p>Отримуйте <strong>7% кешбек</strong> на замовлення їжі через Uber Eats з місцевих ресторанів та кафе.</p>',
      ru: '<p>Получайте <strong>7% кешбэк</strong> на заказы еды через Uber Eats из местных ресторанов и кафе.</p>',
    },
    conditions: {
      en: '<ul><li>Excludes delivery fees and tips</li><li>Minimum order value: $15</li><li>Cashback credited within 7 days of completed delivery</li></ul>',
      uk: '<ul><li>Не включає вартість доставки та чайові</li><li>Мінімальна сума замовлення: $15</li><li>Кешбек нараховується протягом 7 днів після виконання доставки</li></ul>',
      ru: '<ul><li>Не включает стоимость доставки и чаевые</li><li>Минимальная сумма заказа: $15</li><li>Кешбэк начисляется в течение 7 дней после выполнения доставки</li></ul>',
    },
    description: {
      en: '<p>Uber Eats is a food delivery platform connecting users with thousands of local restaurants, enabling fast and convenient meal ordering.</p>',
      uk: '<p>Uber Eats — платформа доставки їжі, яка з\'єднує користувачів з тисячами місцевих ресторанів для швидкого та зручного замовлення страв.</p>',
      ru: '<p>Uber Eats — платформа доставки еды, соединяющая пользователей с тысячами местных ресторанов для быстрого и удобного заказа блюд.</p>',
    },
  },
  {
    id: '14', name: 'AliExpress', cashbackPercent: 3,
    category_id: 1, categoryId: 1,
    logoUrl: avatar('AliExpress'),
    category_name: { en: 'Electronics', uk: 'Електроніка', ru: 'Электроника' },
    cashbackInfo: {
      en: '<p>Earn <strong>3% cashback</strong> on all AliExpress purchases including electronics, clothing, home goods and accessories.</p>',
      uk: '<p>Отримуйте <strong>3% кешбек</strong> на всі покупки на AliExpress, включаючи електроніку, одяг, товари для дому та аксесуари.</p>',
      ru: '<p>Получайте <strong>3% кешбэк</strong> на все покупки на AliExpress, включая электронику, одежду, товары для дома и аксессуары.</p>',
    },
    conditions: {
      en: '<ul><li>Cashback confirmed after buyer protection period ends</li><li>Excludes disputed and refunded orders</li><li>Minimum order: $5</li></ul>',
      uk: '<ul><li>Кешбек підтверджується після закінчення терміну захисту покупця</li><li>Не поширюється на спірні та повернені замовлення</li><li>Мінімальне замовлення: $5</li></ul>',
      ru: '<ul><li>Кешбэк подтверждается после окончания срока защиты покупателя</li><li>Не распространяется на спорные и возвращённые заказы</li><li>Минимальный заказ: $5</li></ul>',
    },
    description: {
      en: '<p>AliExpress is a global online retail marketplace with millions of products from sellers worldwide at competitive prices.</p>',
      uk: '<p>AliExpress — глобальний онлайн-маркетплейс із мільйонами товарів від продавців з усього світу за конкурентними цінами.</p>',
      ru: '<p>AliExpress — глобальный онлайн-маркетплейс с миллионами товаров от продавцов со всего мира по конкурентным ценам.</p>',
    },
  },
  {
    id: '15', name: 'Decathlon', cashbackPercent: 5,
    category_id: 5, categoryId: 5,
    logoUrl: avatar('Decathlon'),
    category_name: { en: 'Sports', uk: 'Спорт', ru: 'Спорт' },
    cashbackInfo: {
      en: '<p>Get <strong>5% cashback</strong> on sports equipment, fitness gear, outdoor clothing and accessories at Decathlon.</p>',
      uk: '<p>Отримуйте <strong>5% кешбек</strong> на спортивне обладнання, фітнес-інвентар, одяг для активного відпочинку та аксесуари в Decathlon.</p>',
      ru: '<p>Получайте <strong>5% кешбэк</strong> на спортивное оборудование, фитнес-инвентарь, одежду для активного отдыха и аксессуары в Decathlon.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for online purchases only</li><li>Excludes items with existing promotions greater than 20%</li><li>Cashback credited within 30 days</li></ul>',
      uk: '<ul><li>Діє лише для онлайн-покупок</li><li>Не поширюється на товари з акційною знижкою понад 20%</li><li>Кешбек нараховується протягом 30 днів</li></ul>',
      ru: '<ul><li>Действует только для онлайн-покупок</li><li>Не распространяется на товары с акционной скидкой более 20%</li><li>Кешбэк начисляется в течение 30 дней</li></ul>',
    },
    description: {
      en: '<p>Decathlon is the world\'s largest sporting goods retailer, offering its own-brand equipment and apparel for 70+ sports at affordable prices.</p>',
      uk: '<p>Decathlon — найбільший у світі ритейлер спортивних товарів, що пропонує власне обладнання та одяг для більш ніж 70 видів спорту за доступними цінами.</p>',
      ru: '<p>Decathlon — крупнейший в мире ритейлер спортивных товаров, предлагающий собственное оборудование и одежду для более чем 70 видов спорта по доступным ценам.</p>',
    },
  },
  {
    id: '16', name: 'Notino', cashbackPercent: 6,
    category_id: 4, categoryId: 4,
    logoUrl: avatar('Notino'),
    category_name: { en: 'Beauty', uk: 'Краса', ru: 'Красота' },
    cashbackInfo: {
      en: '<p>Earn <strong>6% cashback</strong> on perfumes, cosmetics, skincare and hair care products at Notino.</p>',
      uk: '<p>Отримуйте <strong>6% кешбек</strong> на парфуми, косметику, засоби для догляду за шкірою та волоссям у Notino.</p>',
      ru: '<p>Получайте <strong>6% кешбэк</strong> на парфюмерию, косметику, средства по уходу за кожей и волосами в Notino.</p>',
    },
    conditions: {
      en: '<ul><li>Valid on all Notino online purchases</li><li>Excludes gift sets with additional discounts applied</li><li>Cashback credited within 21 days of delivery</li></ul>',
      uk: '<ul><li>Діє на всі онлайн-покупки в Notino</li><li>Не поширюється на подарункові набори з додатковими знижками</li><li>Кешбек нараховується протягом 21 дня після доставки</li></ul>',
      ru: '<ul><li>Действует на все онлайн-покупки в Notino</li><li>Не распространяется на подарочные наборы с дополнительными скидками</li><li>Кешбэк начисляется в течение 21 дня после доставки</li></ul>',
    },
    description: {
      en: '<p>Notino is Europe\'s leading online perfumery and cosmetics retailer, offering a wide selection of luxury and everyday beauty brands.</p>',
      uk: '<p>Notino — провідний онлайн-ритейлер парфумерії та косметики Європи з широким вибором люксових та повсякденних брендів краси.</p>',
      ru: '<p>Notino — ведущий онлайн-ритейлер парфюмерии и косметики Европы с широким выбором люксовых и повседневных брендов красоты.</p>',
    },
  },
  {
    id: '17', name: 'Rozetka', cashbackPercent: 4,
    category_id: 1, categoryId: 1,
    logoUrl: avatar('Rozetka'),
    category_name: { en: 'Electronics', uk: 'Електроніка', ru: 'Электроника' },
    cashbackInfo: {
      en: '<p>Get <strong>4% cashback</strong> on electronics, appliances, clothing and household goods at Rozetka — Ukraine\'s #1 marketplace.</p>',
      uk: '<p>Отримуйте <strong>4% кешбек</strong> на електроніку, побутову техніку, одяг та товари для дому на Rozetka — маркетплейсі №1 в Україні.</p>',
      ru: '<p>Получайте <strong>4% кешбэк</strong> на электронику, бытовую технику, одежду и товары для дома на Rozetka — маркетплейсе №1 в Украине.</p>',
    },
    conditions: {
      en: '<ul><li>Valid for all product categories</li><li>Cashback credited within 30 days of order confirmation</li><li>Excludes gift certificates</li></ul>',
      uk: '<ul><li>Поширюється на всі категорії товарів</li><li>Кешбек нараховується протягом 30 днів після підтвердження замовлення</li><li>Не поширюється на подарункові сертифікати</li></ul>',
      ru: '<ul><li>Распространяется на все категории товаров</li><li>Кешбэк начисляется в течение 30 дней после подтверждения заказа</li><li>Не распространяется на подарочные сертификаты</li></ul>',
    },
    description: {
      en: '<p>Rozetka is Ukraine\'s largest e-commerce marketplace offering over 5 million products across electronics, appliances, fashion, and more.</p>',
      uk: '<p>Rozetka — найбільший маркетплейс електронної комерції України з понад 5 мільйонами товарів у категоріях електроніки, побутової техніки, моди та інших.</p>',
      ru: '<p>Rozetka — крупнейший маркетплейс электронной коммерции Украины с более чем 5 миллионами товаров в категориях электроники, бытовой техники, моды и других.</p>',
    },
  },
  {
    id: '18', name: 'Prom', cashbackPercent: 3,
    category_id: 6, categoryId: 6,
    logoUrl: avatar('Prom'),
    category_name: { en: 'Home & Garden', uk: 'Дім і сад', ru: 'Дом и сад' },
    cashbackInfo: {
      en: '<p>Earn <strong>3% cashback</strong> on home goods, garden accessories, tools and furniture at Prom.ua.</p>',
      uk: '<p>Отримуйте <strong>3% кешбек</strong> на товари для дому, садові аксесуари, інструменти та меблі на Prom.ua.</p>',
      ru: '<p>Получайте <strong>3% кешбэк</strong> на товары для дома, садовые аксессуары, инструменты и мебель на Prom.ua.</p>',
    },
    conditions: {
      en: '<ul><li>Applies to completed orders only</li><li>Excludes seller-initiated discounts from cashback base</li><li>Credited within 45 days of purchase</li></ul>',
      uk: '<ul><li>Поширюється лише на виконані замовлення</li><li>Знижки від продавців виключені з бази нарахування кешбека</li><li>Зараховується протягом 45 днів після покупки</li></ul>',
      ru: '<ul><li>Распространяется только на выполненные заказы</li><li>Скидки от продавцов исключены из базы начисления кешбэка</li><li>Зачисляется в течение 45 дней после покупки</li></ul>',
    },
    description: {
      en: '<p>Prom.ua is Ukraine\'s largest B2C and B2B marketplace, offering millions of products from thousands of verified Ukrainian sellers.</p>',
      uk: '<p>Prom.ua — найбільший B2C та B2B маркетплейс України з мільйонами товарів від тисяч перевірених українських продавців.</p>',
      ru: '<p>Prom.ua — крупнейший B2C и B2B маркетплейс Украины с миллионами товаров от тысяч проверенных украинских продавцов.</p>',
    },
  },
];
