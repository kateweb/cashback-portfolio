import Header from '../components/Header';
import Footer from '../components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { LocaleProvider } from '../contexts/LocaleContext';
import { getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import '../app/[locale]/globals.css';
import {NextUIProvider} from "@nextui-org/system";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: 'SDback',
  description: 'Cashback service',
  favicon: 'favicon.ico',
};

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
        <body className={roboto.className}>
          <div className="bg-white dark-bg-black font-roboto">
            <NextUIProvider>
              <NextIntlClientProvider messages={messages}>
                <LocaleProvider locale={locale}>
                  <Header />
                  {children}
                  <Footer />
                </LocaleProvider>
              </NextIntlClientProvider>
            </NextUIProvider>
          </div>
        </body>
      </html>
  );
}