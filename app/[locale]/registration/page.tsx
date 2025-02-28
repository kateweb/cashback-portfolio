import { useTranslations } from 'next-intl';
import React from "react";
import Layout from '@/components/Layout';
import BackButton from "@/components/ui/BackButton";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import('@/components/forms/AuthForm'), { ssr: false });

const Registration = () => {
  const t = useTranslations('Auth');
  return (
    <Layout>
      <div className='top-block my-6'>
        <BackButton/>
      </div>
      <div className='max-w-[385px] m-auto flex flex-col items-center justify-center'>
        <h2 className="text-center dark-text-white mb-3">{t('reg_text')}</h2>
        <RegisterForm type="registration"/>
      </div>
    </Layout>
  );
};

export default Registration;