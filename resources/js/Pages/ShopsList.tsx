import {InertiaLink, Link, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../components/CLink";
import Main from "../components/page/Main";
import AppLayout from "../Layouts/AppLayout";
import {IPage} from "../types/IPage";
import {Section} from "../components/page/Section";

interface Props {

}

const ShopsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    console.log(page.props.shopsList)

    return (
        <div className="admin-dashboard max-w-3xl w-full">
            <Section>
                <h3>ShopsList</h3>
            </Section>

        </div>
    );
});

export default ShopsList;
