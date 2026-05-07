'use client';
import {useTranslations} from 'next-intl';
import React, { useState } from "react";
import {Input} from "@heroui/input";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocale } from 'use-intl';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

interface AuthFormProps {
	type: 'login' | 'registration';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
	{
		const t = useTranslations('Auth');
		const router = useRouter();
		const [pending, setPending] = useState(false);
		const locale = useLocale();
		const validationSchema = Yup.object().shape({
			email: Yup.string()
				.email(t('errors.email_valid'))
				.required(`${t('errors.required', {name: 'Email'})}`),
			password: Yup.string()
				.min(8, t('errors.password_min', {num: 8}))
				.matches(/[A-Z]/, t('errors.password_uppercase'))
				.matches(/[a-z]/, t('errors.password_lowercase'))
				.matches(/\d/, t('errors.password_number'))
				.required(t('errors.required', {name: t('password')})),
			...(type === 'registration' && {
				agreeToTerms: Yup.bool().oneOf([true], t('errors.agree_required')),
			}),
		});

		const loginFormSubmitted = async (values: { email: string; password: string }) => {
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
		const registerFormSubmitted = async (values: { email: string; password: string }, { setErrors }: { setErrors: (errors: Record<string, string>) => void }) => {
			try {
				const response = await axiosInstance.post('/registration', {
					...values,
					locale
				});
				if (response.status === 201) {
					router.push(`/${locale}/confirmation/`);
				}
			} catch (error: any) {
				const backendErrors: Record<string, string> = {};
				if (error.response?.data?.errors) {
					error.response.data.errors.forEach((fieldError: Record<string, string>) => {
						for (const [key, message] of Object.entries(fieldError)) {
							if (key === 'password') {
								backendErrors[key] = t('errors.password_full');
							} else if (key === 'email' && message.includes('already exists')) {
								backendErrors[key] = t('errors.user_exist');
							} else {
								backendErrors[key] = message;
								toast.error(message);
							}
						}
					});
					setErrors(backendErrors);
				} else {
					toast.error(t('errors.server_error'));
				}
			}
		};

		return (
			<Formik
				initialValues={{email: type === 'login' ? 'demo@demo.com' : '', password: type === 'login' ? 'Demo1234!' : '', agreeToTerms: false}}
				validationSchema={validationSchema}
				onSubmit={type === 'registration' ? registerFormSubmitted : loginFormSubmitted}>
				{() => (
					<Form className="w-full">
						<div className='form-control mb-3'>
							<Field as={Input} type="text" placeholder={t('enter_email')} name="email"/>
							<ErrorMessage name="email" component="p" className="text-sm text-red-400"/>
						</div>
						<div className='form-control mb-3'>
							<Field as={Input} type="password" placeholder={t('enter_password')} name="password"/>
							<ErrorMessage name="password" component="p" className="text-sm text-red-400"/>
						</div>
						{type === 'registration' && (
							<div className="form-control mb-3">
								<label className="flex items-center gap-2 text-sm">
									<Field
										type="checkbox"
										name="agreeToTerms"
										className="h-4 w-4 accent-green"
									/>
									<span>
										{t('agree_with')}{' '}
										<a
											href={`/${locale}/static/marketing_consent/`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-green underline"
										>
											{t('personal_data')}
										</a>
									</span>
								</label>
								<ErrorMessage name="agreeToTerms" component="p" className="text-sm text-red-400"/>
							</div>
						)}
						<button aria-disabled={pending} type='submit'
										className="disabled:pointer-events-none disabled:opacity-50 mt-2 btn inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 w-full">
							{type === 'registration' ? t('reg_button') : t('login_button')}
						</button>
					</Form>
				)}
			</Formik>
		);
	}
}
export default AuthForm;