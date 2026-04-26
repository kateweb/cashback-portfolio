import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';

const LogoutButton = () => {
  const t = useTranslations('Nav');
  const router = useRouter();
  const locale = useLocale();

  const handleLogout = async () => {
    await signOut({
      redirect: false, 
    });
    router.push(`/${locale}/login`); // Redirect to login page
  };

  return (
    <button className='logout' onClick={handleLogout}>{t('logout')}</button>
  );
};

export default LogoutButton;