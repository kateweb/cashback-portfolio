import { ParentLocaleLayout } from '@/components/ParentLocaleLayout';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moneyback',
  description: 'Cashback service',
  icons: {
    icon: '/img/favicon.svg',
    shortcut: '/img/favicon.svg',
    apple: '/img/favicon.svg',
    other: {
      rel: '/img/favicon.svg',
      url: '/img/favicon.svg',
    },
  },
}


export default async function MainLayout({
  children,
  params: { locale }, 
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ParentLocaleLayout locale={locale}>
      {children}
    </ParentLocaleLayout>
  );
}