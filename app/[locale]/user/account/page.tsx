// pages/account
'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Account = () => {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the custom 404 page
		router.push('/404'); // Or any path to a custom 404 page you want
	}, [router]);

	return null; // Empty component, as we're redirecting
};

export default Account;