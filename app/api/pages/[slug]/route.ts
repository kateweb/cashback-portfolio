// app/api/pages/[slug]/route.ts
import { NextResponse } from 'next/server';

type Locale = 'en' | 'uk' | 'ru';
type PageContent = { title: string; content: string };

const MOCK_PAGES: Record<string, Record<Locale, PageContent>> = {
  faq: {
    en: {
      title: 'Frequently Asked Questions',
      content: `
        <h3>What is cashback?</h3>
        <p>Cashback is a reward you receive after making a purchase through our service. A percentage of your purchase amount is returned to your account as bonus funds.</p>
        <h3>How do I activate cashback?</h3>
        <p>Simply click the "Go to store" button on any offer page. Make sure cookies are not cleared before completing your purchase — this is how we track your transaction.</p>
        <h3>How long does cashback take to appear?</h3>
        <p>Cashback first appears with <strong>Waiting</strong> status, usually within 1–7 business days. It switches to <strong>Available</strong> after the store confirms the order (typically 30–45 days).</p>
        <h3>What is the minimum withdrawal amount?</h3>
        <p>The minimum payout amount is 100 UAH. Withdrawals are processed within 3 business days after your request.</p>
        <h3>Why was my cashback declined?</h3>
        <p>Cashback may be declined if the order was cancelled, returned, or if the purchase did not meet the offer conditions (e.g. sale items excluded, minimum order not met).</p>
        <h3>Can I use promo codes and still get cashback?</h3>
        <p>It depends on the offer. Some stores exclude promotional code orders from cashback. Check the offer conditions before purchasing.</p>
      `,
    },
    uk: {
      title: 'Поширені питання',
      content: `
        <h3>Що таке кешбек?</h3>
        <p>Кешбек — це винагорода, яку ви отримуєте після покупки через наш сервіс. Відсоток від суми покупки повертається на ваш рахунок у вигляді бонусних коштів.</p>
        <h3>Як активувати кешбек?</h3>
        <p>Натисніть кнопку «Перейти до магазину» на сторінці будь-якого офера. Перед покупкою не очищайте кукі в браузері — саме так ми відстежуємо ваш перехід.</p>
        <h3>Скільки часу займає нарахування кешбеку?</h3>
        <p>Спочатку кешбек з'являється зі статусом <strong>В очікуванні</strong> — зазвичай протягом 1–7 робочих днів. Після підтвердження замовлення магазином (30–45 днів) він переходить до статусу <strong>Доступно</strong>.</p>
        <h3>Яка мінімальна сума для виводу?</h3>
        <p>Мінімальна сума виводу — 100 грн. Виплати обробляються протягом 3 робочих днів після вашого запиту.</p>
        <h3>Чому мій кешбек відхилено?</h3>
        <p>Кешбек може бути відхилений, якщо замовлення було скасоване, повернуте або якщо покупка не відповідала умовам офера (наприклад, акційні товари виключено, мінімальна сума не дотримана).</p>
        <h3>Чи можна використовувати промокоди та отримати кешбек?</h3>
        <p>Залежить від офера. Деякі магазини виключають замовлення з промокодами з кешбеку. Перевіряйте умови офера перед покупкою.</p>
      `,
    },
    ru: {
      title: 'Частые вопросы',
      content: `
        <h3>Что такое кэшбек?</h3>
        <p>Кэшбек — это вознаграждение, которое вы получаете после покупки через наш сервис. Процент от суммы покупки возвращается на ваш счёт в виде бонусных средств.</p>
        <h3>Как активировать кэшбек?</h3>
        <p>Нажмите кнопку «Перейти в магазин» на странице любого оффера. Не очищайте куки в браузере перед покупкой — именно так мы отслеживаем ваш переход.</p>
        <h3>Сколько времени занимает начисление кэшбека?</h3>
        <p>Сначала кэшбек появляется со статусом <strong>В ожидании</strong> — обычно в течение 1–7 рабочих дней. После подтверждения заказа магазином (30–45 дней) он переходит в статус <strong>Доступно</strong>.</p>
        <h3>Какова минимальная сумма для вывода?</h3>
        <p>Минимальная сумма вывода — 100 грн. Выплаты обрабатываются в течение 3 рабочих дней после вашего запроса.</p>
        <h3>Почему мой кэшбек отклонён?</h3>
        <p>Кэшбек может быть отклонён, если заказ был отменён, возвращён или если покупка не соответствовала условиям оффера.</p>
        <h3>Можно ли использовать промокоды и получить кэшбек?</h3>
        <p>Зависит от оффера. Некоторые магазины исключают заказы с промокодами из кэшбека. Проверяйте условия оффера перед покупкой.</p>
      `,
    },
  },

  rules: {
    en: {
      title: 'Shopping Rules',
      content: `
        <ol>
          <li>
            <p><strong>Activate cashback before shopping.</strong> Always start from our website by clicking the "Go to store" button. Do not open the store in a separate tab.</p>
          </li>
          <li>
            <p><strong>Do not clear browser cookies</strong> between clicking the offer and completing the purchase. Clearing cookies will break the tracking link and cashback will not be credited.</p>
          </li>
          <li>
            <p><strong>Complete the purchase in one session.</strong> Adding items to cart and paying should happen in the same browser session after clicking through from our site.</p>
          </li>
          <li>
            <p><strong>Check offer conditions.</strong> Each offer has specific exclusions — sale items, gift cards, certain categories. Read the conditions before purchasing.</p>
          </li>
          <li>
            <p><strong>Do not use ad blockers.</strong> Ad blockers may interfere with tracking scripts and prevent cashback from being recorded.</p>
          </li>
          <li>
            <p><strong>One transaction per click.</strong> Each click through our service is tracked individually. For multiple purchases, use the "Go to store" button each time.</p>
          </li>
          <li>
            <p><strong>Cashback is not credited for cancelled or returned orders.</strong> If you return a purchase, the associated cashback will be declined.</p>
          </li>
        </ol>
      `,
    },
    uk: {
      title: 'Правила покупок',
      content: `
        <ol>
          <li>
            <p><strong>Активуйте кешбек перед покупкою.</strong> Завжди починайте з нашого сайту, натискаючи кнопку «Перейти до магазину». Не відкривайте магазин в окремій вкладці.</p>
          </li>
          <li>
            <p><strong>Не очищайте кукі браузера</strong> між кліком по оферу та завершенням покупки. Очищення кукі порушить відстежувальний зв'язок і кешбек не буде нараховано.</p>
          </li>
          <li>
            <p><strong>Завершіть покупку в одній сесії.</strong> Додавання товарів у кошик та оплата мають відбуватися в одній сесії браузера після переходу з нашого сайту.</p>
          </li>
          <li>
            <p><strong>Перевіряйте умови офера.</strong> Кожен офер має певні виключення — акційні товари, подарункові картки, окремі категорії. Читайте умови перед покупкою.</p>
          </li>
          <li>
            <p><strong>Не використовуйте блокувальники реклами.</strong> Вони можуть заважати скриптам відстеження та перешкоджати запису кешбеку.</p>
          </li>
          <li>
            <p><strong>Одна транзакція — один клік.</strong> Кожен перехід через наш сервіс відстежується окремо. Для кількох покупок натискайте «Перейти до магазину» щоразу.</p>
          </li>
          <li>
            <p><strong>Кешбек не нараховується за скасованими або поверненими замовленнями.</strong></p>
          </li>
        </ol>
      `,
    },
    ru: {
      title: 'Правила покупок',
      content: `
        <ol>
          <li>
            <p><strong>Активируйте кэшбек перед покупкой.</strong> Всегда начинайте с нашего сайта, нажимая кнопку «Перейти в магазин». Не открывайте магазин в отдельной вкладке.</p>
          </li>
          <li>
            <p><strong>Не очищайте куки браузера</strong> между кликом по офферу и завершением покупки.</p>
          </li>
          <li>
            <p><strong>Завершите покупку в одной сессии.</strong> Добавление товаров в корзину и оплата должны происходить в одной сессии браузера после перехода с нашего сайта.</p>
          </li>
          <li>
            <p><strong>Проверяйте условия оффера.</strong> Каждый оффер имеет определённые исключения — акционные товары, подарочные карты, отдельные категории.</p>
          </li>
          <li>
            <p><strong>Не используйте блокировщики рекламы.</strong> Они могут мешать скриптам отслеживания.</p>
          </li>
          <li>
            <p><strong>Кэшбек не начисляется за отменённые или возвращённые заказы.</strong></p>
          </li>
        </ol>
      `,
    },
  },

  agreement: {
    en: { title: 'Service Agreement', content: '<div class="agreement"><p>This Service Agreement ("Agreement") governs your use of the cashback service ("Service"). By registering and using the Service, you agree to these terms.</p><p><strong>1. Service Description.</strong> The Service provides cashback rewards for purchases made through partner store links. Cashback amounts and conditions vary per offer.</p><p><strong>2. Eligibility.</strong> The Service is available to individuals aged 18 and older. One account per person is allowed.</p><p><strong>3. Cashback Crediting.</strong> Cashback is credited after the store confirms the order, typically within 30–60 days. The Service reserves the right to adjust or decline cashback if the purchase does not meet offer conditions.</p><p><strong>4. Withdrawals.</strong> Minimum withdrawal is 100 UAH. Tax deductions (income tax 18%, military levy 1.5%) apply to all payments per applicable law.</p><p><strong>5. Account Termination.</strong> The Service may suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p></div>' },
    uk: { title: 'Угода про сервіс', content: '<div class="agreement"><p>Ця Угода про сервіс регулює використання вами сервісу кешбеку ("Сервіс"). Реєструючись та використовуючи Сервіс, ви погоджуєтесь з цими умовами.</p><p><strong>1. Опис сервісу.</strong> Сервіс надає кешбек-винагороди за покупки через посилання партнерських магазинів. Суми та умови кешбеку різняться залежно від офера.</p><p><strong>2. Право на участь.</strong> Сервіс доступний особам від 18 років. Дозволяється лише один обліковий запис на особу.</p><p><strong>3. Нарахування кешбеку.</strong> Кешбек нараховується після підтвердження замовлення магазином, зазвичай протягом 30–60 днів.</p><p><strong>4. Виведення коштів.</strong> Мінімальна сума виводу — 100 грн. До всіх виплат застосовуються податкові відрахування (ПДФО 18%, ВЗ 1,5%).</p><p><strong>5. Блокування облікового запису.</strong> Сервіс може призупинити або видалити облікові записи, що порушують ці умови.</p></div>' },
    ru: { title: 'Соглашение об услуге', content: '<div class="agreement"><p>Настоящее Соглашение об услуге регулирует использование вами сервиса кэшбека ("Сервис"). Регистрируясь и используя Сервис, вы соглашаетесь с этими условиями.</p><p><strong>1. Описание сервиса.</strong> Сервис предоставляет кэшбек-вознаграждения за покупки через ссылки партнёрских магазинов.</p><p><strong>2. Право на участие.</strong> Сервис доступен лицам от 18 лет. Разрешён только один аккаунт на человека.</p><p><strong>3. Начисление кэшбека.</strong> Кэшбек начисляется после подтверждения заказа магазином, обычно в течение 30–60 дней.</p><p><strong>4. Вывод средств.</strong> Минимальная сумма вывода — 100 грн. К выплатам применяются налоговые вычеты (НДФЛ 18%, ВС 1,5%).</p><p><strong>5. Блокировка аккаунта.</strong> Сервис может приостановить или удалить аккаунты, нарушающие эти условия.</p></div>' },
  },

  user_agreement: {
    en: { title: 'User Agreement', content: '<div class="user_agreement"><p>By creating an account, you confirm that you have read, understood, and agree to be bound by this User Agreement and our Privacy Policy.</p><p><strong>Account Security.</strong> You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately if you suspect unauthorized access.</p><p><strong>Prohibited Activities.</strong> The following are prohibited: creating multiple accounts, using automated tools to generate clicks, attempting to manipulate cashback amounts, sharing referral links in a misleading manner.</p><p><strong>Intellectual Property.</strong> All content on this platform is the property of the Service and may not be reproduced without written permission.</p><p><strong>Limitation of Liability.</strong> The Service is not liable for delays in cashback crediting caused by partner stores or third-party systems.</p></div>' },
    uk: { title: 'Угода користувача', content: '<div class="user_agreement"><p>Створюючи обліковий запис, ви підтверджуєте, що прочитали, зрозуміли та погоджуєтесь з цією Угодою та нашою Політикою конфіденційності.</p><p><strong>Безпека облікового запису.</strong> Ви несете відповідальність за збереження конфіденційності ваших облікових даних.</p><p><strong>Заборонені дії:</strong> створення кількох облікових записів, використання автоматизованих інструментів для генерації кліків, маніпуляції сумами кешбеку.</p><p><strong>Інтелектуальна власність.</strong> Весь контент платформи є власністю Сервісу.</p><p><strong>Обмеження відповідальності.</strong> Сервіс не несе відповідальності за затримки нарахування кешбеку з боку партнерських магазинів.</p></div>' },
    ru: { title: 'Пользовательское соглашение', content: '<div class="user_agreement"><p>Создавая аккаунт, вы подтверждаете, что прочитали, поняли и согласились с настоящим Соглашением и нашей Политикой конфиденциальности.</p><p><strong>Безопасность аккаунта.</strong> Вы несёте ответственность за сохранение конфиденциальности ваших учётных данных.</p><p><strong>Запрещённые действия:</strong> создание нескольких аккаунтов, использование автоматизированных инструментов для генерации кликов, манипуляции суммами кэшбека.</p><p><strong>Ограничение ответственности.</strong> Сервис не несёт ответственности за задержки начисления кэшбека со стороны партнёрских магазинов.</p></div>' },
  },

  personal_data: {
    en: { title: 'Personal Data Policy', content: '<div class="personal_data"><p>We collect and process personal data to provide the cashback service. This policy explains what data we collect and how it is used.</p><p><strong>Data We Collect:</strong> name, email address, tax identification number (for payouts), IBAN (for payouts), browser cookies for tracking.</p><p><strong>How We Use It:</strong> to verify identity, credit cashback, process withdrawals, send service notifications.</p><p><strong>Data Retention:</strong> account data is retained for the duration of your account. Payout records are retained for 5 years per legal requirements.</p><p><strong>Your Rights:</strong> you may request access to, correction of, or deletion of your personal data by contacting support.</p></div>' },
    uk: { title: 'Політика персональних даних', content: '<div class="personal_data"><p>Ми збираємо та обробляємо персональні дані для надання сервісу кешбеку.</p><p><strong>Дані, які ми збираємо:</strong> ім\'я, електронна адреса, ідентифікаційний номер платника податків (для виплат), IBAN (для виплат), куки браузера для відстеження.</p><p><strong>Як ми їх використовуємо:</strong> для верифікації особи, нарахування кешбеку, обробки виплат, надсилання сервісних сповіщень.</p><p><strong>Зберігання даних:</strong> дані облікового запису зберігаються протягом строку його існування. Записи про виплати — 5 років.</p><p><strong>Ваші права:</strong> ви можете запросити доступ, виправлення або видалення ваших персональних даних.</p></div>' },
    ru: { title: 'Политика персональных данных', content: '<div class="personal_data"><p>Мы собираем и обрабатываем персональные данные для предоставления сервиса кэшбека.</p><p><strong>Собираемые данные:</strong> имя, электронная почта, идентификационный номер налогоплательщика (для выплат), IBAN (для выплат), куки браузера.</p><p><strong>Как мы их используем:</strong> для верификации личности, начисления кэшбека, обработки выплат.</p><p><strong>Хранение данных:</strong> данные аккаунта хранятся в течение срока его существования. Записи о выплатах — 5 лет.</p><p><strong>Ваши права:</strong> вы можете запросить доступ, исправление или удаление ваших персональных данных.</p></div>' },
  },

  cookie_files: {
    en: { title: 'Cookie Policy', content: '<p>We use cookies to enable cashback tracking, maintain your session, and remember your language preference.</p><p><strong>Essential cookies</strong> are required for the service to function. They cannot be disabled.</p><p><strong>Tracking cookies</strong> are used to attribute your purchases to our service and credit cashback. Disabling these will prevent cashback from being recorded.</p><p><strong>Preference cookies</strong> remember your language and display settings.</p><p>You can manage cookies in your browser settings. Note that disabling tracking cookies will disable cashback functionality.</p>' },
    uk: { title: 'Політика файлів cookie', content: '<p>Ми використовуємо куки для відстеження кешбеку, підтримки вашої сесії та збереження мовних налаштувань.</p><p><strong>Необхідні куки</strong> потрібні для роботи сервісу і не можуть бути відключені.</p><p><strong>Відстежувальні куки</strong> використовуються для прив\'язки ваших покупок до нашого сервісу. Їх відключення унеможливить нарахування кешбеку.</p><p><strong>Куки налаштувань</strong> зберігають вашу мову та параметри відображення.</p>' },
    ru: { title: 'Политика файлов cookie', content: '<p>Мы используем куки для отслеживания кэшбека, поддержки вашей сессии и сохранения языковых настроек.</p><p><strong>Необходимые куки</strong> требуются для работы сервиса и не могут быть отключены.</p><p><strong>Отслеживающие куки</strong> используются для привязки ваших покупок к нашему сервису. Их отключение не позволит начислять кэшбек.</p><p><strong>Куки настроек</strong> сохраняют ваш язык и параметры отображения.</p>' },
  },

  marketing_consent: {
    en: { title: 'Marketing Consent', content: '<p>By checking the marketing consent box during registration, you agree to receive promotional communications from us, including: new offer announcements, cashback promotions, platform news and updates.</p><p>You may withdraw this consent at any time by updating your account settings or clicking "Unsubscribe" in any email.</p><p>Withdrawing marketing consent does not affect your ability to use the cashback service or receive transactional notifications.</p>' },
    uk: { title: 'Згода на маркетинг', content: '<p>Позначаючи поле маркетингової згоди під час реєстрації, ви погоджуєтесь отримувати рекламні комунікації від нас: оголошення про нові офери, акції кешбеку, новини платформи.</p><p>Ви можете відкликати цю згоду в будь-який час, оновивши налаштування облікового запису або натиснувши «Відписатися» в будь-якому листі.</p>' },
    ru: { title: 'Согласие на маркетинг', content: '<p>Отмечая поле маркетингового согласия при регистрации, вы соглашаетесь получать рекламные коммуникации от нас: объявления о новых офферах, акции кэшбека, новости платформы.</p><p>Вы можете отозвать это согласие в любое время, обновив настройки аккаунта или нажав «Отписаться» в любом письме.</p>' },
  },

  controller_agreement: {
    en: { title: 'Data Controller Agreement', content: '<p>This agreement establishes the relationship between you (the data subject) and our service (the data controller) regarding the processing of personal data.</p><p><strong>Data Controller:</strong> CashbackService LLC, responsible for determining the purposes and means of processing your personal data.</p><p><strong>Legal Basis:</strong> We process your data based on contractual necessity (to provide the service) and legal obligations (tax reporting for payouts).</p><p><strong>Data Transfers:</strong> We do not sell or transfer your personal data to third parties except as required to provide the service (e.g. payment processing).</p>' },
    uk: { title: 'Угода з контролером даних', content: '<p>Ця угода встановлює відносини між вами (суб\'єктом даних) та нашим сервісом (контролером даних) щодо обробки персональних даних.</p><p><strong>Контролер даних:</strong> CashbackService LLC відповідає за визначення цілей та засобів обробки ваших персональних даних.</p><p><strong>Правова основа:</strong> Ми обробляємо ваші дані на основі договірної необхідності та правових зобов\'язань.</p><p><strong>Передача даних:</strong> Ми не продаємо та не передаємо ваші персональні дані третім сторонам.</p>' },
    ru: { title: 'Соглашение с контролёром данных', content: '<p>Настоящее соглашение устанавливает отношения между вами (субъектом данных) и нашим сервисом (контролёром данных) в отношении обработки персональных данных.</p><p><strong>Контролёр данных:</strong> CashbackService LLC несёт ответственность за определение целей и средств обработки ваших персональных данных.</p><p><strong>Правовое основание:</strong> Мы обрабатываем ваши данные на основе договорной необходимости и правовых обязательств.</p><p><strong>Передача данных:</strong> Мы не продаём и не передаём ваши персональные данные третьим сторонам.</p>' },
  },

  policy: {
    en: { title: 'Privacy Policy', content: '<p>Your privacy is important to us. This Privacy Policy describes how we collect, use, and protect your personal information when you use our cashback service.</p><p><strong>Information We Collect:</strong> Account information (name, email), financial data for payouts (tax ID, IBAN), usage data (clicks, purchases), technical data (IP address, browser type).</p><p><strong>How We Protect Your Data:</strong> We use industry-standard encryption for data transmission and storage. Access to personal data is restricted to authorized personnel only.</p><p><strong>Third-Party Services:</strong> We integrate with partner stores to track purchases. These partners have their own privacy policies.</p><p><strong>Contact:</strong> For privacy-related questions, contact our support team.</p>' },
    uk: { title: 'Політика конфіденційності', content: '<p>Ваша конфіденційність важлива для нас. Ця Політика конфіденційності описує, як ми збираємо, використовуємо та захищаємо вашу особисту інформацію.</p><p><strong>Інформація, яку ми збираємо:</strong> дані облікового запису (ім\'я, email), фінансові дані для виплат (ІПН, IBAN), дані використання (кліки, покупки), технічні дані.</p><p><strong>Як ми захищаємо ваші дані:</strong> Ми використовуємо стандартне шифрування для передачі та зберігання даних.</p><p><strong>Сторонні сервіси:</strong> Ми інтегруємось з партнерськими магазинами для відстеження покупок.</p>' },
    ru: { title: 'Политика конфиденциальности', content: '<p>Ваша конфиденциальность важна для нас. Эта Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию.</p><p><strong>Собираемая информация:</strong> данные аккаунта (имя, email), финансовые данные для выплат (ИНН, IBAN), данные использования (клики, покупки), технические данные.</p><p><strong>Как мы защищаем ваши данные:</strong> Мы используем стандартное шифрование для передачи и хранения данных.</p><p><strong>Сторонние сервисы:</strong> Мы интегрируемся с партнёрскими магазинами для отслеживания покупок.</p>' },
  },
};

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (req.headers.get('locale') || 'uk') as Locale;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', locale },
    });
    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
    const pageData = await response.json();
    if (pageData && Object.keys(pageData).length > 0 && !pageData.error) {
      return NextResponse.json(pageData);
    }
  } catch {
    // fall through to mock
  }

  const page = MOCK_PAGES[slug]?.[locale] ?? MOCK_PAGES[slug]?.['en'];
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  return NextResponse.json(page);
}
