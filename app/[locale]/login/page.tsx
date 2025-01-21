'use client';
import {useTranslations} from 'next-intl';
import React, { useState } from "react";
import Layout from '@/components/Layout';
import {Input} from "@nextui-org/input";
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from "axios";

const Login: React.FC = () => {
  const t = useTranslations('Registration');
  const tl = useTranslations('Login');
  const tb = useTranslations('Offer');
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { locale } = useLocale();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('errors.email_valid'))
      // @ts-ignore
      .required(`${t('errors.required', { name: 'Email' })}`),
    password: Yup.string()
      // @ts-ignore
      .min(8,t('errors.password_min', { num: 8 }))
      .matches(/[A-Z]/, t('errors.password_uppercase'))
      .matches(/[a-z]/, t('errors.password_lowercase'))
      .matches(/\d/, t('errors.password_number'))
      // @ts-ignore
      .required(t('errors.required', { name: t('password') })),
  });
  
  
  const formSubmitted = async (values) => {
    setPending(true);
    const response = await axios.get('/api/auth/getip');
    const ip = response.data.ip;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        ip: ip
      });
      if (res?.error ) {
        console.log('res error :::: ',res)
        let errText = res.error.toLowerCase().replaceAll(/\s+/g, '_').replace(/\.$/, '')
        toast.error(tl(`errors.${errText}`));
        setPending(false);
      } else {
        setPending(false);
        router.push(`/${locale}`);
  
      }
    } catch (error) {
      console.error("Login error:", error);
      setPending(false);
    }
  };

  return (
    <Layout>
      <div className='top-block my-6 '>
        <button onClick={() => window.history.back()}
          className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          <svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          {tb('back_button')}
        </button>
      </div>
      <div className='max-w-[385px] m-auto flex flex-col items-center justify-center'>
        <h2 className="text-center dark-text-white mb-3">{tl('text')}</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={formSubmitted}>
          {({ isSubmitting }) => (
          <Form className="w-full">
            <div className='form-control mb-3'>
              <Field as={Input} type="text" placeholder={t('enter_email')} name="email" />
              <ErrorMessage name="email" component="p" className="text-sm text-red-400" />
            </div>
            <div className='form-control mb-3'>
              <Field as={Input} type="password" placeholder={t('enter_password')} name="password" />
              <ErrorMessage name="password" component="p" className="text-sm text-red-400" />
            </div>
            <button  aria-disabled={pending} type='submit' className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full">
              {tl('btn_text')}
            </button>
          </Form>
         )}
        </Formik>
        <Link href={"/"+locale+"/forgot-password"} className='mt-4 text-gray-400 text-sm font-medium'>
          {tl('reset_password')}
        </Link>
      </div>
    </Layout>
  );
};
export default Login;