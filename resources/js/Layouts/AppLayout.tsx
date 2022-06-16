import {Inertia} from '@inertiajs/inertia';
import {InertiaLink, Head} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, {PropsWithChildren, useState} from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import JetApplicationMark from '@/Jetstream/ApplicationMark';
import JetBanner from '@/Jetstream/Banner';
import JetDropdown from '@/Jetstream/Dropdown';
import JetDropdownLink from '@/Jetstream/DropdownLink';
import JetNavLink from '@/Jetstream/NavLink';
import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink';

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
            <Head title={title}></Head>
            <JetBanner/>

            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    {/* <!-- Primary Navigation Menu --> */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                {/* <!-- Logo --> */}
                                <div className="flex-shrink-0 flex items-center">
                                    <InertiaLink href={route('home')}>
                                        <JetApplicationMark className="block h-9 w-auto"/>
                                    </InertiaLink>
                                </div>

                                {/* <!-- Navigation Links --> */}
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <JetNavLink
                                        href={route('home')}
                                        active={route().current('home')}
                                    >
                                        home
                                    </JetNavLink>

                                    <JetNavLink
                                        href={route('shops')}
                                        active={route().current('shops')}
                                    >
                                        shops
                                    </JetNavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">

                                </div>

                                {/* <!-- Settings Dropdown --> */}
                                <div className="ml-3 relative">
                                    <JetDropdown
                                        align="right"
                                        width="48"
                                        renderTrigger={() =>
                                            page.props.jetstream.managesProfilePhotos ? (
                                                <button
                                                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={page.props.user.profile_photo_url}
                                                        alt={page.props.user.name}
                                                    />
                                                </button>
                                            ) : (
                                                <span className="inline-flex rounded-md">
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
                        </span>
                                            )
                                        }
                                    >
                                        {/* <!-- Account Management --> */}
                                        <div className="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
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
                            </div>

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
                        </div>
                    </div>

                    {/* <!-- Responsive Navigation Menu --> */}
                    <div
                        className={classNames('sm:hidden', {
                            block: showingNavigationDropdown,
                            hidden: !showingNavigationDropdown,
                        })}
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <JetResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </JetResponsiveNavLink>
                        </div>

                        {/* <!-- Responsive Settings Options --> */}
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                {page.props.jetstream.managesProfilePhotos ? (
                                    <div className="flex-shrink-0 mr-3">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={page.props.user.profile_photo_url}
                                            alt={page.props.user.name}
                                        />
                                    </div>
                                ) : null}

                                <div>
                                    <div className="font-medium text-base text-gray-800">
                                        {page.props.user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {page.props.user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <JetResponsiveNavLink
                                    href={route('profile.show')}
                                    active={route().current('profile.show')}
                                >
                                    Profile
                                </JetResponsiveNavLink>

                                {page.props.jetstream.hasApiFeatures ? (
                                    <JetResponsiveNavLink
                                        href={route('api-tokens.index')}
                                        active={route().current('api-tokens.index')}
                                    >
                                        API Tokens
                                    </JetResponsiveNavLink>
                                ) : null}

                                {/* <!-- Authentication --> */}
                                <form method="POST" onSubmit={logout}>
                                    <JetResponsiveNavLink as="button">
                                        Log Out
                                    </JetResponsiveNavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* <!-- Page Heading --> */}
                {renderHeader ? (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {renderHeader()}
                        </div>
                    </header>
                ) : null}

                {/* <!-- Page Content --> */}
                <main>{children}</main>
            </div>
        </div>
    );
}
