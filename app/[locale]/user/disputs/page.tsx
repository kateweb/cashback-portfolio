'use client';

import {useTranslations} from 'next-intl';
import { useEffect, useState } from 'react';
import React from "react";
import Layout from '@/components/Layout';
import {Input} from "@heroui/input";
import {Textarea} from "@heroui/input";
import { useSearchParams } from 'next/navigation';
import FileUpload from '@/components/forms/FileUpload';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomDateTimepicker from "@/components/forms/CustomDateTimepicker";
import {toast} from "react-toastify";
import { fetchWithAuth } from "@/utils/fetchWithAuth";


const Disputs = () => {
  const t = useTranslations('Disputs');
  const te = useTranslations('Errors');
  const searchParams = useSearchParams();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [offerId, setOfferId] = useState('');
  const [offerName, setOfferName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  type DateValue = Date | null;
  const [date, setDate] = useState<DateValue>(null);

  //Validation for form
  let patternTwoDigisAfterComma = /^\d+(\.\d{1,2})?$/;
  const validationSchema = Yup.object().shape({
    offer: Yup.number().required(te('required')),
    offerName: Yup.string().required(te('required')),
    orderDate: Yup.string().required(te('required')),
    number: Yup.string().required(te('required')).max(255, te('max', {max: 255})),
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
      ).required(te('required')),
    phoneNumber: Yup.string()
      .matches(/^(?:\+38)?0\d{9}$/, te('tel_format'))
      .required(te('required')),
    comment: Yup.string().max(400, te('max', {max: 400})),
    file: Yup.mixed()
      .required(te('required'))
      .test('fileSize', te('file_size', {size: 5}), (value) => {
        if (!value) return false;
        const file = value as File;
        return file.size <= 5 * 1024 * 1024;
      })
      .test('fileType', te('file_format'), (value) => {
        if (!value) return false;
        const file = value as File;
        const allowedExt = ['png', 'jpeg', 'jpg', 'pdf'];
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension ? allowedExt.includes(extension) : false;
      }),
  });
  // Get query params
  useEffect(() => {
    if (searchParams) {
      const offerIdParam = searchParams.get('offerId');
      const offerNameParam = searchParams.get('offerName');
      const dateParam = searchParams.get('date');

      setOfferId(offerIdParam || '');
      setOfferName(offerNameParam || '');

      if (dateParam) {
        const decodedDate = decodeURIComponent(dateParam);
        const [datePart, timePart] = decodedDate.split(' ');
        const [day, month, year] = datePart.split('.');
        if (day && month && year && timePart) {
          const [hours, minutes, seconds] = timePart.split(':');
          const parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes),
            Number(seconds)
          );
          setDate(parsedDate);
        } else {
          setDate(null);
        }
      }

      if (offerIdParam && offerNameParam && dateParam) {
        setIsDisabled(true);
      }
      setIsReady(true);
    }
  }, [searchParams]);

  // Send form for lost order
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const formatDate = (date) => {
      return new Date(date).toISOString().replace('T', ' ').slice(0, 19);
    };
    const formattedDate = formatDate(values.orderDate);
    const formData = new FormData();
    formData.append('offer', values.offer);
    formData.append('orderDate', formattedDate);
    formData.append('number', values.number);
    formData.append('amount', values.amount);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('comment', values.comment);

    if (values.file) {
      formData.append('file', values.file);
    }
    try {
      const response = await fetchWithAuth('/api/lost-order', {
        method: 'POST',
        body: formData,
      });
      if (!response) return;
      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            let errorMessage = Object.values(error).join(', ');
            toast.error(errorMessage);
          });
        } else {
          toast.error(data.error || 'Failed to create lost order request');
        }
        return;
      }
      resetForm();
      toast.success(t('success_alert'));
    } catch (error) {
      toast.error('Error creating lost order request');
      console.error('Error creating lost order request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {isReady && (
        <Formik
          initialValues={{
            offer: offerId,
            offerName: offerName || '',
            orderDate: date || '',
            number: '',
            amount: '',
            phoneNumber: '',
            comment: '',
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className='mx-auto my-4 max-w-[600px] dark-text-white'>
              <h3 className='text-2xl font-bold mb-4'>{t('lost_cashback_title')}</h3>
              <Field as={Input} type="hidden" name="offer" />
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('shop_title')}</label>
                <Field as={Input} type="text" placeholder={t('shop_title')} isDisabled={isDisabled} value={offerName} />
                <ErrorMessage name="offer" component="p" className="text-sm text-red-400"/>
              </div>
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('date_time')}</label>
                <CustomDateTimepicker
                  isDisabled={isDisabled}
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                    const formatted = newDate instanceof Date
                      ? newDate.toISOString().split('T')[0]
                      : '';
                    formik.setFieldValue('orderDate', formatted);
                  }}/>
                <ErrorMessage name="orderDate" component="p" className="text-sm text-red-400"/>
              </div>
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('order_number')}</label>
                <Field as={Input} type="text" name="number" placeholder={t('enter_order_number')} />
                <ErrorMessage name="number" component="p" className="text-sm text-red-400"/>
              </div>
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('order_sum')}</label>
                <Field as={Input} type="number" name="amount" placeholder='0'/>
                <ErrorMessage name="amount" component="p" className="text-sm text-red-400"/>
              </div>
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('phone_number')}</label>
                <Field as={Input} type="text" name="phoneNumber" placeholder="+380 99 000 00 00" />
                <ErrorMessage name="phoneNumber" component="p" className="text-sm text-red-400"/>
              </div>
              <div className='form-control mb-3'>
                <label className='font-medium text-sm mb-1 block'>{t('comment')}</label>
                <Field as={Textarea} name="comment" placeholder={t('enter_comment')}/>
                <ErrorMessage name="comment" component="p" className="text-sm text-red-400"/>
              </div>
              <p className='font-medium text-sm'>{t('alert_file_text')}</p>
              <div className='form-control mb-3'>
                <div className='my-6'>
                  <FileUpload formik={formik}/>
                </div>
              </div>
              <button className="disabled:pointer-events-none disabled:opacity-50 mt-4 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2"
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? t('btn_text_submitting') : t('btn_text')}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default Disputs;