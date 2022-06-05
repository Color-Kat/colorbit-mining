import {InertiaLink, useForm, Head} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
// import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
// import JetButton from '@/Jetstream/Button';
// import JetCheckbox from '@/Jetstream/Checkbox';
// import JetInput from '@/Jetstream/Input';
// import JetLabel from '@/Jetstream/Label';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import AuthenticationCard from "@components/auth/AuthenticationCard";
import Label from "@components/auth/Label";
import Input from "@components/auth/Input";
import Checkbox from "@components/auth/Checkbox";
import Button from "@components/auth/Button";
import CLink from "../../components/CLink";

export default function Register() {
    const page = useTypedPage();
    const route = useRoute();
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('register'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    }

    return (
        <AuthenticationCard>
            <Head title="Register"/>

            <JetValidationErrors className="mb-4"/>

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.name}
                        onChange={e => form.setData('name', e.currentTarget.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Почта</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.currentTarget.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password}
                        onChange={e => form.setData('password', e.currentTarget.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation">Повторите пароль</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password_confirmation}
                        onChange={e =>
                            form.setData('password_confirmation', e.currentTarget.value)
                        }
                        required
                        autoComplete="new-password"
                    />
                </div>

                {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
                    <div className="mt-4">
                        <Label htmlFor="terms">
                            <div className="flex items-center">
                                <Checkbox
                                    name="terms"
                                    id="terms"
                                    checked={form.data.terms}
                                    onChange={e => form.setData('terms', e.currentTarget.checked)}
                                />

                                <div className="ml-2">
                                    I agree to the
                                    <a
                                        target="_blank"
                                        href={route('terms.show')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Terms of Service
                                    </a>
                                    and
                                    <a
                                        target="_blank"
                                        href={route('policy.show')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </Label>
                    </div>
                )}

                {/*<div className="flex items-center justify-end mt-4">*/}
                <div className="flex flex-col mt-4 items-end justify-center">
                    <CLink
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 my-2"
                    >
                        Уже зарегистрированы?
                    </CLink>

                    <Button
                        className={classNames('ml-4', {'opacity-25': form.processing})}
                        disabled={form.processing}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
}
