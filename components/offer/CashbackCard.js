import Link from 'next/link';
import { useLocale } from 'use-intl';
import Image from 'next/image';

const CashbackCard = ({ id, brand, cashbackPercent, category, imgUrl }) => {
  const locale = useLocale();
  return (
    <Link
      href={'/' + locale + '/offers/' + id}
      className='cashback-card p-4 bg-white dark-bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark-border-transparent
        hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col'
    >
      <div className='w-20 h-14 mb-3 relative flex items-center justify-center'>
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={brand}
            className='object-contain rounded-md'
            fill
            sizes='80px'
          />
        ) : (
          <div className='cashback-empty-img w-full h-full rounded-md' />
        )}
      </div>
      <h2 className='text-base font-bold dark-text-white leading-snug'>{brand}</h2>
      <p className='cashback-percent mt-1'>{cashbackPercent}%</p>
      <p className='text-xs text-gray-400 dark-text-slate-400 mt-0.5'>{category}</p>
    </Link>
  );
};

export default CashbackCard;
