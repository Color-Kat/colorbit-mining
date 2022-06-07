import {useForm} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, {useRef, useState} from 'react';
import useRoute from '@hooks/useRoute';
import JetDangerButton from '@/Jetstream/DangerButton';
import JetInputError from '@/Jetstream/InputError';
import ActionSection from "../ActionSection";
import DialogModal from "../../modal/DialogModal";
import Input from "../Input";
import SecondaryButton from "../SecondaryButton";
import Button from "../Button";
import InputError from "../InputError";

export default React.memo(function DeleteUserForm() {
    const route = useRoute();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const form = useForm({
        password: '',
    });
    const passwordRef = useRef<HTMLInputElement>(null);

    function confirmUserDeletion() {
        setConfirmingUserDeletion(true);

        setTimeout(() => passwordRef.current?.focus(), 250);
    }

    function deleteUser() {
        form.delete(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordRef.current?.focus(),
            onFinish: () => form.reset(),
        });
    }

    function closeModal() {
        setConfirmingUserDeletion(false);
        form.reset();
    }

    return (
        <ActionSection
            title={'Удалить аккаунт'}
            description={'Навсегда удалить аккаунт.'}
        >
            <div className="max-w-xl text-base text-gray-400 font-play">
                При удалении будут удалены все данные аккаунта навсегда.
            </div>

            <div className="mt-5">
                <Button onClick={confirmUserDeletion}>
                    Удалить аккаунт
                </Button>
            </div>

            {/* <!-- Delete Account Confirmation Modal --> */}
            <DialogModal isOpen={confirmingUserDeletion} onClose={closeModal}>
                <DialogModal.Content title={'Delete Account'}>
                    Вы уверены, что хотите удалить ваш аккаунт?
                    Это удалит все ваши игровые данные
                    Введите пароль, чтобы подтвердить ваши действия
                    <div className="mt-4">
                        <Input
                            type="password"
                            className="mt-1 block w-3/4 bg-gray-700"
                            placeholder="Password"
                            value={form.data.password}
                            onChange={e => form.setData('password', e.currentTarget.value)}
                        />

                        <InputError message={form.errors.password} className="mt-2"/>
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={closeModal}>Отмена</SecondaryButton>

                    <Button
                        onClick={deleteUser}
                        className={classNames('ml-2', {'opacity-25': form.processing})}
                        disabled={form.processing}
                    >
                        Удалить аккаунт
                    </Button>
                </DialogModal.Footer>
            </DialogModal>
        </ActionSection>
    );
});
