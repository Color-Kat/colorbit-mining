import {Inertia} from '@inertiajs/inertia';
import {InertiaLink, Head} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, {PropsWithChildren, useState} from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../components/CLink";
import {Dropdown, DropdownLink} from "../components/elements/Dropdown";

interface Props {
    title: string;

    renderHeader?(): JSX.Element;
}

export default function AppLayout({
                                      title,
                                      renderHeader,
                                      children,
                                  }: PropsWithChildren<Props>) {
    const page = useTypedPage();
    const route = useRoute();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    return (
        <div>
            <Head title={title}/>

            <nav className="min-h-screen bg-gray-100">
                <div className="bg-white border-b border-gray-100">
                    {/* <!-- Primary Navigation Menu --> */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                {/* <!-- Logo --> */}
                                <div className="flex-shrink-0 flex items-center">
                                    <InertiaLink href={route('home')}>
                                        {/*<JetApplicationMark className="block h-9 w-auto"/>*/}
                                    </InertiaLink>
                                </div>

                                {/* <!-- Navigation Links --> */}
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <CLink
                                        href={route('home')}
                                        active={route().current('home')}
                                    >
                                        home
                                    </CLink>

                                    <CLink
                                        href={route('shops')}
                                        active={route().current('shops')}
                                    >
                                        shops
                                    </CLink>
                                </div>
                            </div>


                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative"/>

                                {/* <!-- Settings Dropdown --> */}
                                <div className="ml-3 relative">
                                    <Dropdown
                                        align="right"
                                        width="48"
                                        renderTrigger={() => (
                                            <button
                                                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                <img
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src={page.props.user.profile_photo_url}
                                                    alt={page.props.user.name}
                                                />
                                            </button>
                                        )}>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
                                        >
                                            {page.props.user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>

                                        {/* <!-- Account Management --> */}
                                        <div className="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <DropdownLink href={route('profile.show')}>
                                            Profile
                                        </DropdownLink>

                                        <div className="border-t border-gray-100"/>

                                        {/* <!-- Authentication --> */}
                                        <form onSubmit={logout}>
                                            <DropdownLink>Log Out</DropdownLink>
                                        </form>

                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- Hamburger --> */}
            <div className="-mr-2 flex items-center sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(!showingNavigationDropdown)
                    }
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={classNames({
                                hidden: showingNavigationDropdown,
                                'inline-flex': !showingNavigationDropdown,
                            })}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={classNames({
                                hidden: !showingNavigationDropdown,
                                'inline-flex': showingNavigationDropdown,
                            })}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <main>{children}</main>
        </div>
    );
}
