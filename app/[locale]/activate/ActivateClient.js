import React from 'react';
import { useTranslations } from 'next-intl';

export default function ActivateClient({ error }) {
  const t = useTranslations('Activate');
  return (
    <div className='m-auto mx-5 mb-16 mt-4 flex flex-col items-center justify-center'>
      <h1 className="mb-5 text-center text-lg text-red-400">
        {t(`errors.${error}`)}
      </h1>
    </div>
  );
}