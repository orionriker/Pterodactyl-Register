import React, { useEffect, useRef, useState } from 'react';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import http, { httpErrorToHuman } from '@/api/http';
import { useStoreState } from 'easy-peasy';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import Field from '@/components/elements/Field';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';

interface Values {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
}

export default () => {
    const ref = useRef<Reaptcha>(null);
    const [ token, setToken ] = useState('');

    const { clearFlashes, addFlash } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState(state => state.settings.data!.recaptcha);

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
        clearFlashes();

        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch(error => {
                console.error('Error.recaptcha:' + error);

                setSubmitting(false);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            });
            return;
        }

        http.get('/sanctum/csrf-cookie')
            .then(() => http.post('/auth/register', { ...values }))
            .then(response => {
                /**
                 * DEBUG
                 */
                // console.log(response.data);

                resetForm();
                addFlash({ type: 'success', title: 'Success', message: response.data });
            }).catch(error => {
                /**
                 * DEBUG
                 */
                // console.log(error.response.data);

                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            });
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{ firstname: '', lastname: '', username: '', email: '' }}
            validationSchema={object().shape({
                firstname: string()
                    .required('A first-name must be provided.')
                    .min(2, 'First-name is Too Short!')
                    .max(20, 'First-name is Too Long!'),
                lastname: string()
                    .required('A last-name must be provided.')
                    .min(2, 'Last-name is Too Short!')
                    .max(20, 'Last-name is Too Long!'),
                username: string()
                    .required('A username must be provided.')
                    .min(3, 'Username is Too Short!')
                    .max(24, 'Username is Too Long!'),
                email: string()
                    .required('A email must be provided.')
                    .email('Email is invalid!'),
            })}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <LoginFormContainer title={'Register'} css={tw`w-full flex`}>
                    <Field
                        light
                        type={'text'}
                        label={'First Name'}
                        name={'firstname'}
                        disabled={isSubmitting}
                    />
                    <div css={tw`mt-6`}>
                        <Field
                            light
                            type={'text'}
                            label={'Last Name'}
                            name={'lastname'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field
                            light
                            type={'text'}
                            label={'Username'}
                            name={'username'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field
                            light
                            type={'email'}
                            label={'Email'}
                            name={'email'}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div css={tw`mt-6`}>
                        <Button type={'submit'} size={'xlarge'} isLoading={isSubmitting} disabled={isSubmitting}>
                            Register
                        </Button>
                    </div>
                    {recaptchaEnabled &&
                    <Reaptcha
                        ref={ref}
                        size={'invisible'}
                        sitekey={siteKey || '_invalid_key'}
                        onVerify={response => {
                            setToken(response);
                            submitForm();
                        }}
                        onExpire={() => {
                            setSubmitting(false);
                            setToken('');
                        }}
                    />
                    }
                    <div css={tw`mt-6 text-center`}>
                        <a
                            href={'/auth/login'}
                            css={tw`text-xs ml-3 text-neutral-500 tracking-wide no-underline uppercase hover:text-neutral-600`}
                        >
                            Already Have An Account?
                        </a>
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};
