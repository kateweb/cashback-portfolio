import { ParentLocaleLayout } from '@/components/ParentLocaleLayout';

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