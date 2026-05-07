import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import HomeButton from "@/components/ui/HomeButton";
import React from "react";
import Link from 'next/link';
import {useTranslations} from 'next-intl';

const LoginForm = dynamic(() => import('@/components/forms/AuthForm'), { ssr: false });

const LoginPage= ({ params }: { params: { locale: string } }) => {
  const t = useTranslations('Auth');
  const { locale } = params;
  return (
    <Layout>
      <div className='top-block my-6 '>
        <HomeButton/>
      </div>
      <div className='max-w-[385px] m-auto flex flex-col items-center justify-center'>
        <h2 className="text-center dark-text-white mb-3">{t('login_text')}</h2>
        <div className='w-full mb-3 rounded-md border border-green-400 bg-green-50 px-4 py-3 text-sm text-green-800'>
          <strong>Demo access:</strong> email <code>demo@demo.com</code> / password <code>Demo1234!</code>
        </div>
        <LoginForm type="login"/>
        <Link href={"/"+locale+"/forgot-password"} className='mt-4 text-gray-400 text-sm font-medium'>
          {t('reset_password')}
        </Link>
      </div>
    </Layout>
);
};
export default LoginPage;