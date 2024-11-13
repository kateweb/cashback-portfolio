'use client';

import Layout from '@/components/Layout';
import SetPassword from './SetPassword';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword({ searchParams, params }) {
  const locale = params.locale;
  const token = searchParams.token;
  const t = useTranslations();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitPassword = async (values) => {
    setIsSubmitting(true);
    const data = {
      recoveryToken: token,
      password: values.password,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success(t('SetPassword.confirmation_text'));
        setTimeout(() => {
          router.push(`/${locale}/login`);
        }, 1500);
      } else {
        const errorText = resData.errors?.toString().toLowerCase().replace(/\s+/g, '_') || "activation_failed";

        toast.error(t(`Activate.errors.${errorText}`));
      }
    } catch (error) {
      toast.error(t('errors.server_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SetPassword onSubmitPassword={onSubmitPassword} isSubmitting={isSubmitting} />
    </Layout>
  );
}
