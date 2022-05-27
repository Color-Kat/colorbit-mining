import {InertiaLink, Link} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {Head} from '@inertiajs/inertia-react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
}

export default function Welcome({
                                    canLogin,
                                    canRegister,
                                    laravelVersion,
                                    phpVersion,
                                }: Props) {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <div
            className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">


            <Link href='/dashboard' as='button'>123123</Link>

            {/*{canLogin ? (*/}
            {/*  <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">*/}
            {/*    {page.props.user ? (*/}
            {/*      <InertiaLink*/}
            {/*        href={route('dashboard')}*/}
            {/*        className="text-sm text-gray-700 underline"*/}
            {/*      >*/}
            {/*        Dashboard*/}
            {/*      </InertiaLink>*/}
            {/*    ) : (*/}
            {/*      <>*/}
            {/*        <InertiaLink*/}
            {/*          href={route('login')}*/}
            {/*          className="text-sm text-gray-700 underline"*/}
            {/*        >*/}
            {/*          Log in*/}
            {/*        </InertiaLink>*/}

            {/*        {canRegister ? (*/}
            {/*          <InertiaLink*/}
            {/*            href={route('register')}*/}
            {/*            className="ml-4 text-sm text-gray-700 underline"*/}
            {/*          >*/}
            {/*            Register*/}
            {/*          </InertiaLink>*/}
            {/*        ) : null}*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*) : null}*/}
            {/*</div>*/}
        </div>
    );
}
