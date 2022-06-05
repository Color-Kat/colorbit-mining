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

                <div className="mt-4">

                </div>

                {/*<div className="flex items-center justify-end mt-4">*/}
                {/*<div className="flex space-y-2 flex-row md:items-center justify-between md:space-y-0 mt-4">*/}
                <div className="flex space-y-2 flex-col md:items-center justify-between md:space-y-0 mt-4">
                    <div className="flex flex-col items-start self-start xsm:mb-3">
                        <Label htmlFor="terms">
                            <div className="flex items-center">
                                <Checkbox
                                    name="terms"
                                    id="terms"
                                    checked={form.data.terms}
                                    onChange={e => form.setData('terms', e.currentTarget.checked)}
                                />

                                <div className="ml-2 text-sm leading-4s text-gray-400">
                                    Я принимаю&nbsp;
                                    <a
                                        target="_blank"
                                        href={route('terms.show')}
                                        className="underline text-sm hover:text-gray-200"
                                    >
                                        Условия
                                    </a>
                                    &nbsp;и&nbsp;
                                    <a
                                        target="_blank"
                                        href={route('policy.show')}
                                        className="underline text-sm hover:text-gray-200"
                                    >
                                        Политику использования
                                    </a>
                                </div>
                            </div>
                        </Label>
                    </div>

                    <div className="flex xsm:justify-between w-full items-center flex-col xsm:flex-row">
                        <CLink
                            href={route('login')}
                            className="underline text-sm hover:text-gray-200 self-start xsm:self-center flex"
                        >
                            Уже зарегистрированы?
                        </CLink>

                        <Button
                            className={classNames('xsm:ml-4 font-sans font-bold xsm:self-end w-full mt-3 xsm:mt-0 xsm:w-auto flex justify-center', {'opacity-25': form.processing})}
                            disabled={form.processing}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>

                </div>
            </form>
        </AuthenticationCard>
    );
}
