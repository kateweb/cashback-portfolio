"use client"
import {useLocale} from "@/contexts/LocaleContext";
import {useTranslations} from "next-intl";
export default function BackButton({}) {
	const { locale } = useLocale();
	const t = useTranslations('Offer');
	const handleBackButtonClick = () => {
		window.location.href = `/${locale}`;
	};
	return (
		<button onClick={handleBackButtonClick}
						className="back-btn btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2">
			<svg className="w-4 h-4 mr-2 text-gray-800 dark-text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
					 fill="none" viewBox="0 0 14 10">
				<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"/>
			</svg>
			{t('back_button')}
		</button>
	)
}
