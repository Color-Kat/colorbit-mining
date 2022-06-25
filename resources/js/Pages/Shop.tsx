import {InertiaLink, Link, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../components/CLink";
import Main from "../components/page/Main";
import AppLayout from "../Layouts/AppLayout";
import {IPage} from "../types/IPage";

interface Props {

}

const Shop: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <>

            <span>Shop</span>

        </>
    );
});

export default Shop;
