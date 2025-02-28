'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { useTranslations } from 'next-intl';
import { Input } from "@heroui/input";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SetPassword({ onSubmitPassword, isSubmitting }) {
  const t = useTranslations();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t('Auth.errors.password_min', { num: 8 }))
      .matches(/[A-Z]/, t('Auth.errors.password_uppercase'))
      .matches(/[a-z]/, t('Auth.errors.password_lowercase'))
      .matches(/\d/, t('Auth.errors.password_number'))
      .required(t('Auth.errors.required', { name: t('Auth.password') })),
  });

  return (
    <Layout>
      <div className='m-auto mx-5 mb-16 my-5 flex flex-col items-center justify-center'>
        <div className='set-password-form max-w-[385px] w-full m-auto flex flex-col items-center justify-center transition-opacity duration-300'>
          <h2 className="text-center dark-text-white mb-3">{t('SetPassword.text')}</h2>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmitPassword}
          >
            <Form className="w-full">
              <div className='form-control mb-3'>
                <Field as={Input} type="password" placeholder={t('Auth.enter_password')} name="password" />
                <ErrorMessage name="password" component="p" className="text-sm text-red-400" />
              </div>
              <button
                type='submit'
                className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full"
                disabled={isSubmitting}
              >
                {t('SetPassword.btn_text')}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
