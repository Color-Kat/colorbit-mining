import React, {memo} from 'react';

import useRoute from '@/hooks/useRoute';
import {Inertia} from "@inertiajs/inertia";
import useTypedPage from "@hooks/useTypedPage";
import DialogModal from "../modal/DialogModal";
import SecondaryButton from "../profile/SecondaryButton";
import Button from "../elements/Button";

const LoginModal: React.FC<{loginModal: boolean, setLoginModal: (data: boolean) => void}>
    = ({loginModal, setLoginModal}) => {
    const page = useTypedPage();
    const route = useRoute();

    const isAuth = !!page.props.user;

    function login() {
        Inertia.get(route('login'));
    }

    return (
        <DialogModal isOpen={!isAuth && loginModal} onClose={() => setLoginModal(false)}>
            <DialogModal.Content title={'Войдите в аккаунт'}>
                <span>
                    Вы не авторизованы
                </span>
            </DialogModal.Content>
            <DialogModal.Footer>
                <SecondaryButton onClick={() => setLoginModal(false)}>Отмена</SecondaryButton>

                <Button
                    onClick={login}
                    className="ml-2"
                >
                    Войти
                </Button>
            </DialogModal.Footer>
        </DialogModal>
    );
}

export default LoginModal;
