'use client';
import { useTranslations } from 'next-intl';
import React from "react";
import Layout from '@/components/Layout';
import { Input } from "@heroui/input";
import { useLocale } from '@/contexts/LocaleContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axiosInstance';

const Registration = () => {
  const t = useTranslations('Auth');
  const router = useRouter();
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

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await axiosInstance.post('/registration', {
        ...values,
        locale
      });

      if (response.status === 201) {
        router.push('/confirmation'); 
      } 
    } catch (error:any) {
      const backendErrors = {};
      if(error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          for (const [key, message] of Object.entries(error)) {
            if (key === 'password') {
              backendErrors[key] = t('errors.password_full'); 
            } else if (key === 'email' && typeof message === 'string' && message.includes('already exists')) {
              backendErrors[key] = t('errors.user_exist'); 
            } else {
              backendErrors[key] = message;
              toast.error(backendErrors[key]);
            }
          }
        });
        setErrors(backendErrors);
      } else {
        toast.error(t('errors.server_error'));
      }
    }
  };

  return (
    <Layout>
      <div className='top-block my-6'>
        <button onClick={() => window.history.back()}
          className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
          <svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          {t('back_button')}
        </button>
      </div>
      <div className='max-w-[385px] m-auto flex flex-col items-center justify-center'>
        <h2 className="text-center dark-text-white mb-3">{t('reg_text')}</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
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
              <button type='submit' className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full">
                {t('reg_button')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Registration;