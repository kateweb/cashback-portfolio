'use client';

import {useTranslations} from 'next-intl';
import { useEffect, useState } from 'react';
import React from "react";
import Layout from '@/components/Layout';
import {Input} from "@heroui/input";
import {Textarea} from "@heroui/input";
import { useSearchParams } from 'next/navigation';
import FileUpload from '@/components/forms/FileUpload';
import CustomDatepicker from '@/components/forms/CustomDatepicker';

const Disputs = () => {
  const t = useTranslations('Disputs');
  const searchParams = useSearchParams();

  const [isDisabled, setIsDisabled] = useState(false);
  const [offerId, setOfferId] = useState('');
  const [offerName, setOfferName] = useState('');

  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, setDate] = useState<Value>(null);

  useEffect(() => {
    if (searchParams) {
      const offerIdParam = searchParams.get('offerId');
      const offerNameParam = searchParams.get('offerName');
      const dateParam = searchParams.get('date');

      setOfferId(offerIdParam || '');
      setOfferName(offerNameParam || '');
      
      if (dateParam) {
        const [day, month, year] = dateParam.split('.'); 
        const formattedDate = new Date(Number(year), Number(month) - 1, Number(day)); 
        setDate(formattedDate);
      } else {
        setDate(null);
      }

      if (offerIdParam && offerNameParam && dateParam) {
        setIsDisabled(true);
      }
    }
  }, [searchParams]); 
  

  return (
    <Layout>
      <form className='mx-auto my-4 max-w-[600px] dark-text-white'>
        <h3 className='text-2xl font-bold mb-4'>{t('lost_cashback_title')}</h3>
        <Input value={offerId} type="hidden" />
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('shop_title')}</label>
          <Input value={offerName} type="text" placeholder={t('shop_title')} isDisabled={isDisabled} />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('date_time')}</label>
          <CustomDatepicker className="max-w-[240px] w-full transition-none" isDisabled={isDisabled} value={value} onChange={setDate} />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('order_number')}</label>
          <Input type="text" placeholder={t('enter_order_number')} />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('order_sum')}</label>
          <Input type="number" placeholder='0'/>
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('phone_number')}</label>
          <Input type="text" placeholder="+380 99 000 00 00" />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('comment')}</label>
          <Textarea placeholder={t('enter_comment')}/>
        </div>
        <p className='font-medium text-sm'>{t('alert_file_text')}</p>
        <div className='form-control mb-3'>
          <div className='my-6'>  
            <FileUpload></FileUpload>
          </div>
        </div>
        <button className="disabled:pointer-events-none disabled:opacity-50 mt-4 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2"
          disabled={isDisabled}>
          {t('btn_text')}
        </button>
      </form>
    </Layout>
  );
};

export default Disputs;