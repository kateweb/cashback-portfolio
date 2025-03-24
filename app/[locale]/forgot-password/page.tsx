'use client';
import { useTranslations } from 'next-intl';
import React from "react";
import Layout from '@/components/Layout';
import { Input } from "@heroui/input";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axiosInstance';

const ForgotPassword = () => {
  const t = useTranslations();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Auth.errors.email_valid'))
      .required(`${t('Auth.errors.required', { name: 'Email' })}`),
  });

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await axiosInstance.post('/reset-password', {
        ...values
      });
      if (response.status === 200) {
        // @ts-ignore
        document.querySelector('.forgot-password-form').classList.add('opacity-0', 'h-px')
        // @ts-ignore
        document.querySelector('.forgot-password-confirmation').classList.replace("opacity-0", "opacity-100");
      } 
    } catch (error:any) {
      if(error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          if (error && error.includes('not found')) {
            toast.error(t('Activate.errors.user_not_found'))
          } else {
            toast.error(error);
          }
        });
      } else {
        toast.error(t('Auth.errors.server_error'));
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
          {t('Offer.back_button')}
        </button>
      </div>
      <div className='forgot-password-form max-w-[385px] m-auto flex flex-col items-center justify-center transition-opacity duration-300'>
        <h2 className="text-center dark-text-white mb-3">{t('ForgotPassword.text')}</h2>
        <Formik
          initialValues={{ email: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full">
            <div className='form-control mb-3'>
              <Field as={Input} type="text" placeholder={t('Auth.enter_email')} name="email" />
              <ErrorMessage name="email" component="p" className="text-sm text-red-400" />
            </div>
            <button type='submit' className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full">
              {t('ForgotPassword.btn_text')}
            </button>
          </Form>
        </Formik>
      </div>
      <div className="forgot-password-confirmation transition-opacity duration-300 opacity-0">
        <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
          <h1 className="mb-5 text-center text-lg dark-text-white">{t('ForgotPassword.confirmation_text')}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;