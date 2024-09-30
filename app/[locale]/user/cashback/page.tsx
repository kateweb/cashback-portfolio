'use client';

import {useTranslations} from 'next-intl';
import { useState }  from "react";
import Layout from '@/components/Layout';
import {Select, SelectItem} from "@nextui-org/select";
import CustomDatepicker from '@/components/CustomDatepicker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Cashback = () => {
  const t = useTranslations('Cashback');
  const statuses = [
    { key: "available", label: t('status.available')},
    { key: "waiting", label: t('status.waiting')},
    { key: "declined", label: t('status.declined')}
  ]
  const [value, onChange] = useState<Value>(null);

  return (
    <Layout>
      <div className='my-5 sm:-mx-3 md:mx-5 dark-text-white '>
        <div className='sm:flex justify-content-center'>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('waiting')+"0 "+t('uah')}
          </div>
          <div className='cashback-item m-3 p-2 pb-6 font-bold rounded-lg bg-white dark-bg-gray-800 border dark-border-transparent shadow-sm bg-card text-darkgreen'>
            {t('available')+"0 "+t('uah')}
          </div>
        </div>
        <div className='sm:flex justify-content-center cashback-form'>
          <Select 
            label={t('status.title')}
            className="sm:max-w-xs mb-3 sm:m-3" >
            {statuses.map((status) => (
              <SelectItem key={status.key}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <CustomDatepicker calendarAriaLabel={t('choose_date')} className="sm:max-w-xs w-full mb-3 sm:m-3" value={value} onChange={onChange} />
        </div>
      </div>
    </Layout>
  );
};

export default Cashback;