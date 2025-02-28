'use client';

import {useTranslations} from 'next-intl';
import { useState }  from "react";
import Layout from '@/components/Layout';
import {Select, SelectItem} from "@heroui/select";
import CustomDatepicker from '@/components/forms/CustomDatepicker';
import BalancesItems from "@/components/BalancesItems";

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
        <BalancesItems/>
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