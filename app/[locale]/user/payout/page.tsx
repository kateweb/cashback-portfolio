'use client';

import {useTranslations} from 'next-intl';
import React from "react";
import Layout from '@/components/Layout';
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import BalancesItems from "@/components/BalancesItems";

const Payout = () => {
  const t = useTranslations('Payout');
  const isDisabled = true;

  return (
    <Layout>
      <div className='my-5 -mx-3 md:mx-5 dark-text-white '>
        <BalancesItems/>
        <div className='mx-auto my-4 max-w-[664px] dark-text-white'>
          <form className='mx-3'>
            <h3 className='text-xl font-bold mb-4'>{t('form.application_title')}</h3>
            <div className='form-control mb-3'>
              <label className='font-medium text-sm mb-1 block'>{t('form.choose_account')}</label>
              <Select 
              placeholder={t('form.choose_account')}
              disabledKeys={["no_accounts"]} >
              <SelectItem key="no_accounts" textValue="no_accounts">
                {t('form.no_accounts')}
              </SelectItem>
            </Select>
            </div>
            <div className='form-control mb-3'>
              <label className='font-medium text-sm mb-1 block'>{t('form.enter_ipn')}</label>
              <Input type="number" placeholder="1234567890" />
            </div>
            <div className='form-control mb-3'>
              <label className='font-medium text-sm mb-1 block'>{t('form.enter_sum')}</label>
              <Input type="number" placeholder="0" />
            </div>
            <button disabled={isDisabled} className="disabled:pointer-events-none disabled:opacity-50 mt-4 btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
              {t('form.btn_text')}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Payout;