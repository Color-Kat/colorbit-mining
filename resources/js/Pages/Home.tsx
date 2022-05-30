import {InertiaLink, Link, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../components/CLink";
import Main from "../components/Main";
import AppLayout from "../Layouts/AppLayout";
import {IPage} from "../types/IPage";

interface Props {

}

const Home: IPage = () => {
    const route = useRoute();
    const page = useTypedPage();


    return (
        <>

            <CLink href='/dashboard'>123123</CLink>

        </>
    );
}

// Home.layout = (page) => <AppLayout title="123" children={page} />;

export default Home;
