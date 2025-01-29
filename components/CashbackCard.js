import Link from 'next/link';
import { useLocale } from '../contexts/LocaleContext';
import Image from 'next/image'

const CashbackCard = ({id, brand, cashback, category, imgUrl }) => {
  const {locale} = useLocale();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Link href={baseUrl+locale+"/offers/"+id}
      className="cashback-card p-4 bg-white dark-bg-gray-800 rounded-lg shadow-md h-auto border-1 dark-border-transparent hover:scale-10 transition duration-300 ease-in-out hover:-translate-y-1">
        {imgUrl ? <Image src={imgUrl} alt={brand} className="w-20 h-20 mb-4 object-contain" width={50} height={50} /> : <img className="w-20 h-20 mb-4 object-contain" width={50} height={50}/>}

      <h2 className="text-lg font-bold dark-text-white">{brand}</h2>
      <p className="text-green-600">{cashback}</p>
      <p className="text-gray-500 dark-text-slate-400">{category}</p>
    </Link>
  );
};

export default CashbackCard;