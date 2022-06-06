import {InertiaLink, useForm, Head} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, {useEffect} from 'react';
import useRoute from '@hooks/useRoute';
import AuthenticationCard from "@components/auth/AuthenticationCard";
import Label from "@components/auth/Label";
import Input from "@components/auth/Input";
import Checkbox from "@components/auth/Checkbox";
import CLink from "@components/CLink";
import Button from "@components/auth/Button";
import ValidationErrors from "@components/auth/ValidationErrors";

interface Props {
    canResetPassword: boolean;
    status: string;
}

export default React.memo(function Login({canResetPassword, status}: Props) {
    const route = useRoute();
    const form = useForm({
        email: '',
        password: '',
        remember: '',
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    }

    return (
        <AuthenticationCard>
            <Head title="Войти"/>

            <ValidationErrors className="mb-4"/>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
            )}

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email">Почта</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.currentTarget.value)}
                        required
                        autoFocus
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
                        autoComplete="current-password"
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={form.data.remember === 'on'}
                            onChange={e =>
                                form.setData('remember', e.currentTarget.checked ? 'on' : '')
                            }
                        />
                        <span className="ml-2 text-md ">Запомнить меня</span>
                    </label>
                </div>

                <div
                    className="flex space-y-2 flex-row md:items-center justify-between md:space-y-0 mt-4"
                >
                    <div className="flex justify-between md:flex-1 flex-col md:flex-row">
                        <CLink
                            href={route('password.request')}
                            className="underline text-sm hover:text-gray-200 leading-4"
                        >
                            Забыли пароль?
                        </CLink>

                        <CLink
                            href={route('register')}
                            className="underline text-sm hover:text-gray-200 leading-4"
                        >
                            Создать аккаунт
                        </CLink>
                    </div>

                    <Button
                        className={classNames('ml-4 font-sans font-bold', {'opacity-25': form.processing})}
                        disabled={form.processing}
                    >
                        Войти
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
});
