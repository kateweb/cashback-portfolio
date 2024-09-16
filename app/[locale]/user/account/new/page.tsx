'use client';

import { useState } from 'react';
import {useTranslations} from 'next-intl';
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import Layout from '@/components/Layout';

const Account = () => {
  const t = useTranslations('Account');
  const [selectedSupplier, setSelectedSupplier] = useState(''); 
  const suppliers = [
    { key: "sumy", label: t('suppliers.sumy') },
    { key: "vinnytsya", label: t('suppliers.vinnytsya') },
    { key: "chernigiv", label: t('suppliers.chernigiv') }
  ];

  const handleSelectChange = (value: any) => {
    setSelectedSupplier(value);
  };

  const isDisabled = !selectedSupplier; 

  return (
    <Layout>
      <form className='mx-auto my-4 max-w-[30rem] dark-text-white'>
        <h3 className='text-lg mb-4'>{t('add_account')}</h3>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('form.choose_supplier')}</label>
          <Select 
            labelPlacement="outside"
            placeholder={t('form.choose_supplier')}
            onChange={handleSelectChange}
            value={selectedSupplier}>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.key}>
                {supplier.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('form.enter_account_number')}</label>
          <Input type="number" placeholder="162026195"  isDisabled={isDisabled} />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('form.eic_code')}</label>
          <Input type="text" placeholder="6224307460791231" isDisabled={isDisabled} />
        </div>
        <div className='form-control mb-3'>
          <label className='font-medium text-sm mb-1 block'>{t('form.full_name')}</label>
          <Input type="text" placeholder={t('form.full_name_placeholder')}  isDisabled={isDisabled} />
        </div>
        <button className="disabled:pointer-events-none disabled:opacity-50 mt-4 btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2"
          disabled={isDisabled}>
          {t('form.add_btn')}
        </button>
      </form>
    </Layout>
  );
};

export default Account;