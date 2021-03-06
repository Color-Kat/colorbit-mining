import React, {memo} from 'react';

import CLink from '@components/CLink';
import useRoute from '@/hooks/useRoute';
import {Inertia} from "@inertiajs/inertia";
import useTypedPage from "@hooks/useTypedPage";
import {Dropdown, DropdownLink} from "@components/elements/Dropdown";

const AccountButton: React.FC = () => {
    const page = useTypedPage();
    const route = useRoute();

    const isAuth = !!page.props.user;
    const isAdmin = page.props.user?.role?.slug === 'admin';

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    if (!isAuth) return (
        <div className="ml-3 relative">
            <CLink href={route('login')}>
                <span className="font-play text-lg text-gray-200 hover:text-gray-300 px-4 pb-1">
                    Войти
                </span>
            </CLink>
        </div>
    )

    return (
        <div className="ml-3 relative">
            <Dropdown
                align="right"
                width="48"
                renderTrigger={() =>
                    <span className="inline-flex rounded-md ">
                        <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-medium rounded-md text-gray-300 app-bg-dark hover:text-gray-200 focus:outline-none transition"
                        >
                            {page.props.user.name}
                        </button>

                        <button className="hidden md:flex text-sm border-2 border-transparent rounded-full transition border-red-500">
                            <img
                                className="h-9 w-9 rounded-full object-cover"
                                src={page.props.user.profile_photo_url}
                                alt={page.props.user.name}
                            />
                        </button>
                    </span>
                }
            >
                {/* <!-- Account Management --> */}
                <div className="block px-4 py-2 text-xs md:text-sm text-black">
                    Управление аккаунтом
                </div>

                <DropdownLink href={route('profile.show')}>
                    Профиль
                </DropdownLink>

                {isAdmin && (
                    <DropdownLink href={route('admin.dashboard')}>
                        Админ панель
                    </DropdownLink>
                )}

                {/* <!-- Authentication --> */}
                <div onClick={logout} className="border-gray-400 border-t-2">
                    <DropdownLink>Выйти</DropdownLink>
                </div>
            </Dropdown>
        </div>
    );
}

export default memo(AccountButton);
