import Header from '../components/Header';
import Footer from '../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { LocaleProvider } from '../contexts/LocaleContext';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import '../app/[locale]/globals.css';
import {NextUIProvider} from "@nextui-org/system";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create and export the ParentLocaleLayout component
export async function ParentLocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = await getMessages();

  // Get the cookies to check for the authorization token
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;

  // Determine if the user is authorized
  const isAuthorized = Boolean(token);
  
  return (
      <html lang={locale}>
        <body>
          <div className="bg-white dark-bg-black font-roboto">
            <NextUIProvider>
              <NextIntlClientProvider messages={messages}>
                <LocaleProvider locale={locale}>
                  <Header isAuthorized={isAuthorized} />
                  {children}
                  <Footer />
                  <ToastContainer />
                </LocaleProvider>
              </NextIntlClientProvider>
            </NextUIProvider>
          </div>
        </body>
      </html>
  );
}