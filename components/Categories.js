
"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useLocale } from '../contexts/LocaleContext';

const Categories = () => {
  const { locale } = useLocale();
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    try {
      fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',       // For specifying JSON content
          'lang': locale,                  // Custom header for locale
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data)});
    } catch (error) {
      console.error('Error fetching offer:', error);
    }
  }, [locale]);

  return (
    <div className="categories my-4 flex flex-wrap justify-content-center">
      {categories.map((category) => (
        <Link key={category.name} href={`/${locale}/category/${category.id}`} className="hover-green bg-gray-50 border border-gray-300 text-gray-900 text-center rounded-full px-4 py-2 m-2 text-sm font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;