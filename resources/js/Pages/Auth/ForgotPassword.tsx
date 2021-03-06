import {useForm, Head} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@hooks/useRoute';
import AuthenticationCard from "../../components/auth/AuthenticationCard";
import Label from "@components/auth/Label";
import Button from "@components/auth/Button";
import Input from "@components/auth/Input";
import ValidationErrors from "@components/auth/ValidationErrors";

interface Props {
    status: string;
}

export default React.memo(function ForgotPassword({status}: Props) {
    const route = useRoute();
    const form = useForm({
        email: '',
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('password.email'));
    }

    return (
        <AuthenticationCard>
            {/* @ts-ignore */}
            <Head>
                <title>Востановление пароля</title>
                <meta name="description" content="Сброс пароля. Colorbit-mining - онлайн симулятор майнинга." />
            </Head>

            <div className="mb-4 text-md text-gray-400">
                Забыли пароль? Нет проблем. Укажите вашу почту, и мы отправим вам письму для сброса пароля.

                {/*Forgot your password? No problem. Just let us know your email address*/}
                {/*and we will email you a password reset link that will allow you to*/}
                {/*choose a new one.*/}
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
            )}

            <ValidationErrors className="mb-4"/>

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
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

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className={classNames({'opacity-25': form.processing})}
                        disabled={form.processing}
                    >
                        Отправить письмо
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
});
