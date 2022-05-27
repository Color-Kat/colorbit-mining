import {InertiaLink, Link, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {Head} from '@inertiajs/inertia-react';
import CLink from "../components/CLink";
import Main from "../components/Main";

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

    console.log(usePage())


    return (
        <Main>

            <CLink href='/dashboard'>123123</CLink>

        </Main>
    );
}
