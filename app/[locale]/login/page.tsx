import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import BackButton from "@/components/ui/BackButton";
import AuthForm from "@/components/forms/AuthForm";
import React from "react";
import {useTranslations} from 'next-intl';

const LoginForm = dynamic(() => import('@/components/forms/AuthForm'), { ssr: false });

const LoginPage= () => {
  const t = useTranslations('Auth');
  return (
    <Layout>
      <div className='top-block my-6 '>
        <BackButton/>
      </div>
      <div className='max-w-[385px] m-auto flex flex-col items-center justify-center'>
        <h2 className="text-center dark-text-white mb-3">{t('login_text')}</h2>
        <AuthForm type="login"/>
      </div>
    </Layout>
);
};
export default LoginPage;