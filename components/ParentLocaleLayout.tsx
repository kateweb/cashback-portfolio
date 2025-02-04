import Header from './nav/Header';
import Footer from './nav/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { getMessages } from 'next-intl/server';
import '../app/[locale]/globals.css';
import {HeroUIProvider} from "@heroui/system";
import Provider from "../components/Provider";
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
 
  return (
      <html lang={locale}>
        <body>
          <div className="bg-white dark-bg-black font-roboto">
            <HeroUIProvider>
              <NextIntlClientProvider messages={messages}>
                <LocaleProvider locale={locale}>
                  <Provider>
                    <Header/>
                    {children}
                    <Footer />
                    <ToastContainer />
                  </Provider>
                </LocaleProvider>
              </NextIntlClientProvider>
            </HeroUIProvider>
          </div>
        </body>
      </html>
  );
}