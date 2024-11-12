import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const LogoutButton = () => {
  const t = useTranslations('Nav');
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false, 
    });
    router.push('/login'); // Redirect to login page
  };

  return (
    <button className='logout' onClick={handleLogout}>{t('logout')}</button>
  );
};

export default LogoutButton;