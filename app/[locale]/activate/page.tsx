import Layout from '@/components/Layout';
import ActivateClient from './ActivateClient';
import { redirect } from 'next/navigation';

async function fetchActivationToken(searchParams, locale) {
  const token = searchParams.token;
  if (!token) {
    return "no_token_provided";
  }
  const data = {
    activationToken: token,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activate`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await res.json();

  if (res.ok) {
    redirect(`/${locale}/login`);
  } else {
    return resData.errors?.toString().toLowerCase().replace(/\s+/g, '_') || "activation_failed";
  }
}

export default async function Activate({ searchParams, params }) {
  const locale = params.locale;
  const error = await fetchActivationToken(searchParams, locale);
  return (
    <Layout>
      <ActivateClient error={error} />
    </Layout>
  );
}