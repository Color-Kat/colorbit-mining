import React, {memo} from 'react';

import CLink from './CLink';
import useRoute from '@/hooks/useRoute';
import {Inertia} from "@inertiajs/inertia";
import useTypedPage from "../hooks/useTypedPage";
import JetDropdown from "../Jetstream/Dropdown";
import JetDropdownLink from "../Jetstream/DropdownLink";

const AccountButton: React.FC = () => {
    const page = useTypedPage();
    const route = useRoute();

    const isAuth = page.props.user;

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    if (!isAuth) return (
        <div className="ml-3 relative">
            <CLink href={route('login')}>Login</CLink>
        </div>
    )

    return (
        <div className="ml-3 relative">
            <JetDropdown
                align="right"
                width="48"
                renderTrigger={() =>
                    <span className="inline-flex rounded-md">
                        <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-medium rounded-md text-gray-300 app-bg-dark hover:text-gray-700 focus:outline-none transition"
                        >
                            {page.props.user.name}

                            {/*<svg*/}
                            {/*    className="ml-2 -mr-0.5 h-4 w-4"*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*    viewBox="0 0 20 20"*/}
                            {/*    fill="currentColor"*/}
                            {/*>*/}
                            {/*    <path*/}
                            {/*        fillRule="evenodd"*/}
                            {/*        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"*/}
                            {/*        clipRule="evenodd"*/}
                            {/*    />*/}
                            {/*</svg>*/}
                        </button>

                        <button className="flex text-sm border-2 border-transparent rounded-full transition border-red-500">
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
                <div className="block px-4 py-2 text-xs text-gray-400">
                    Управление аккаунтом
                </div>

                <JetDropdownLink href={route('profile.show')}>
                    Profile
                </JetDropdownLink>

                {page.props.jetstream.hasApiFeatures ? (
                    <JetDropdownLink href={route('api-tokens.index')}>
                        API Tokens
                    </JetDropdownLink>
                ) : null}

                <div className="border-t border-gray-100"></div>

                {/* <!-- Authentication --> */}
                <form onSubmit={logout}>
                    <JetDropdownLink as="button">Log Out</JetDropdownLink>
                </form>
            </JetDropdown>
        </div>
    );
}

export default memo(AccountButton);
