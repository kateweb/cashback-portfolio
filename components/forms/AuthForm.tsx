'use client';
import {useTranslations} from 'next-intl';
import React, { useState } from "react";
import {Input} from "@heroui/input";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocale } from '@/contexts/LocaleContext';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from "axios";

interface AuthFormProps {
	type: 'login' | 'registration';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
	{
		const t = useTranslations('Auth');
		const router = useRouter();
		const [pending, setPending] = useState(false);
		const { locale } = useLocale();
		const validationSchema = Yup.object().shape({
			email: Yup.string()
				.email(t('errors.email_valid'))
				// @ts-ignore
				.required(`${t('errors.required', {name: 'Email'})}`),
			password: Yup.string()
				// @ts-ignore
				.min(8, t('errors.password_min', {num: 8}))
				.matches(/[A-Z]/, t('errors.password_uppercase'))
				.matches(/[a-z]/, t('errors.password_lowercase'))
				.matches(/\d/, t('errors.password_number'))
				// @ts-ignore
				.required(t('errors.required', {name: t('password')})),
		});

		const formSubmitted = async (values) => {
			setPending(true);
			const response = await axios.get('/api/auth/getip');
			const ip = response.data.ip;
			try {
				const res = await signIn('credentials', {
					redirect: false,
					email: values.email,
					password: values.password,
					ip: ip
				});
				if (res?.error) {
					let errText = res.error.toLowerCase().replaceAll(/\s+/g, '_').replace(/\.$/, '');
					toast.error(t(`errors.${errText}`));
					setPending(false);
				} else {
					setPending(false);
					router.push(`/${locale}`);
				}
			} catch (error) {
				console.error("Login error:", error);
				setPending(false);
			}
		};

		return (
			<Formik
				initialValues={{email: '', password: ''}}
				validationSchema={validationSchema}
				onSubmit={formSubmitted}>
				{({isSubmitting}) => (
					<Form className="w-full">
						<div className='form-control mb-3'>
							<Field as={Input} type="text" placeholder={t('enter_email')} name="email"/>
							<ErrorMessage name="email" component="p" className="text-sm text-red-400"/>
						</div>
						<div className='form-control mb-3'>
							<Field as={Input} type="password" placeholder={t('enter_password')} name="password"/>
							<ErrorMessage name="password" component="p" className="text-sm text-red-400"/>
						</div>
						<button aria-disabled={pending} type='submit'
										className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full">
							{type === 'registration' ? t('reg_button') : t('login_button')}
						</button>
					</Form>
				)}
			</Formik>
		);
	};
}
export default AuthForm;