'use client';

import {useTranslations} from 'next-intl';
import React, {useEffect, useState} from "react";
import Layout from '@/components/Layout';
import {Input} from "@heroui/input";
import BalancesItems from "@/components/BalancesItems";
import {Alert} from "@heroui/alert";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import {toast} from "react-toastify";
import PaymentTable from "@/components/PaymentTable";

const Payout = () => {
  const t = useTranslations('Payout');
  const te = useTranslations('Errors');
  const [settings, setSettings] = useState({ vs: 0, ndfl: 0, min: 0 });
  const [availableBalance, setAvailableBalance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshBalance, setRefreshBalance] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  //Fetch payment settings list
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const response = await fetch('/api/payment/settings/list');
        const data = await response.json();
        if (response.ok) {
          const settingsMap = Object.fromEntries(data.map(item => [item.name, item.value]));
          setSettings({
            vs: settingsMap["military_tax_percent"],
            ndfl: settingsMap["income_tax_percent"],
            min: settingsMap["min_payment_limit"]
          });
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentSettings();
  }, []);

  //Validation for form
  let patternTwoDigisAfterComma = /^\d+(\.\d{1,2})?$/;
  const validationSchema = Yup.object().shape({
    client: Yup.string()
      .min(3, te('min', {min: 3}))
      .max(255, te('max', {max: 255}))
      .required(te('required')),
    taxNumber: Yup.string()
      .length(10, te('length', {length: 10}))
      .required(te('required')),
    iban: Yup.string()
      .length(29, te('length', {length: 29}))
      .required(te('required')),
    amount: Yup.number()
      .test(
        "is-decimal",
        te('decimal_number'),
        (val: any) => {
          if (val != undefined) {
            return patternTwoDigisAfterComma.test(val);
          }
          return true;
        }
      )
      .min(settings?.min, t('form.errors.amount.min', {min: settings?.min}))
      .max(availableBalance, t('form.errors.amount.max', {max: availableBalance}))
      .required(te('required')),
  });

  //Send form for payment
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: values.client,
          taxNumber: String(values.taxNumber),
          iban: values.iban,
          amount: values.amount,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            let errorMessage = Object.values(error).join(', ');
            if (error.iban && error.iban.includes('is not a valid')) {
              errorMessage = t('form.errors.invalid_iban');
            }
            toast.error(errorMessage);
          });
        } else {
          toast.error(data.error || 'Failed to create payment request');
        }
        return;
      }
      resetForm();
      setRefreshBalance((prev) => !prev);
      setRefreshTable((prev) => !prev);
      toast.success(t('form.success_alert'));
    } catch (error) {
      toast.error('Error creating payment request');
      console.error('Error creating payment request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className='my-5 md:mx-5 dark-text-white '>
        <div className='sm:-mx-3 lg:mx-0'>
          <BalancesItems setAvailableBalance={setAvailableBalance} refresh={refreshBalance}/>
        </div>
        <div className='mx-auto my-4 max-w-[664px] dark-text-white'>
          <div key="warning" className="w-100  flex items-center mb-5">
            <Alert color="warning" title={t('form.tax_alert', {ndfl: settings?.ndfl, vs: settings?.vs})}/>
          </div>
          <Formik
            initialValues={{
              client: '',
              taxNumber: '',
              iban: '',
              amount: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({isValid}) => (
              <Form noValidate>
                <h3 className='text-xl font-bold mb-4'>{t('form.application_title')}</h3>
                <div className='form-control mb-3'>
                  <label className='font-medium text-sm mb-1 block'>{t('form.full_name')}</label>
                  <Field as={Input} type="text" name="client"/>
                  <ErrorMessage name="client" component="p" className="text-sm text-red-400"/>
                </div>
                <div className='form-control mb-3'>
                  <label className='font-medium text-sm mb-1 block'>{t('form.ipn')} <small>({t('form.passport_info')})</small></label>
                  <Field as={Input} type="number" name="taxNumber"/>
                  <ErrorMessage name="taxNumber" component="p" className="text-sm text-red-400"/>
                </div>
                <div className='form-control mb-3'>
                  <label className='font-medium text-sm mb-1 block'>IBAN</label>
                  <Field as={Input} type="text" name="iban"/>
                  <ErrorMessage name="iban" component="p" className="text-sm text-red-400"/>
                </div>
                <div className='form-control mb-3'>
                  <label className='font-medium text-sm mb-1 block'>{t('form.sum')}</label>
                  <Field as={Input} type="number" name="amount"/>
                  <ErrorMessage name="amount" component="p" className="text-sm text-red-400"/>
                </div>
                <button type="submit" disabled={!isValid || isSubmitting}
                        className="disabled:pointer-events-none disabled:opacity-50 mt-4 btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
                  {isSubmitting ? t('form.btn_text_submitting') : t('form.btn_text')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className='mx-auto my-4 max-w-[800px] dark-text-white'>
          <h3 className='text-xl font-bold mb-4 mt-5'>{t('table.list')}</h3>
          <PaymentTable refresh={refreshTable}/>
        </div>
      </div>
    </Layout>
  );
};

export default Payout;