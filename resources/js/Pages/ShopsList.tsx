import {InertiaLink, Link, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../components/CLink";
import Main from "../components/page/Main";
import AppLayout from "../Layouts/AppLayout";
import {IPage} from "../types/IPage";
import {Section} from "../components/page/Section";
import {IPaginator} from "../types/IPaginator";
import {IShopListItem} from "../types/shops/IShopListItem";
import Paginator from "../components/elements/Paginator";
import {PageTitle} from "../components/page/PageTitle";

const ShopsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{
        shopsList: IPaginator<IShopListItem>
    }>();

    const shopsListPaginator = page.props.shopsList;

    console.log(page.props.shopsList)

    return (
        <div className="admin-dashboard max-w-3xl w-full">
            <PageTitle title="Магазины" description="Ищите комплектующие? Загляните в один их этих магазинов."/>

            <Section>
                <h3>ShopsList</h3>

                <Paginator paginator={shopsListPaginator} />
            </Section>
        </div>
    );
});

export default ShopsList;
