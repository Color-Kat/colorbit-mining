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

const Shop: IPage = () => {
    const route = useRoute();
    const page = useTypedPage();

    console.log(page.props)

    return (
        <>

            <span>Shop</span>

        </>
    );
}

export default Shop;
