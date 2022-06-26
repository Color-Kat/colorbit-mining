import React from 'react';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {Section} from "@components/page/Section";
import {IPaginator} from "@/types/IPaginator";
import {IShopListItem} from "@/types/shops/IShopListItem";
import Paginator from "@components/elements/Paginator";
import {PageTitle} from "@components/page/PageTitle";

const ShopsList: IPage = React.memo(() => {
    const page = useTypedPage<{
        shopsList: IPaginator<IShopListItem>
    }>();

    const shopsListPaginator = page.props.shopsList;
    const currentShops = shopsListPaginator.data;

    console.log(currentShops)

    return (
        <div className="admin-dashboard max-w-3xl w-full">
            <PageTitle title="Магазины" description="Ищите комплектующие? Загляните в один их этих магазинов."/>

            <Section>
                {currentShops.map(shop => (
                    <div>{shop.name}</div>
                ))}

                <Paginator paginator={shopsListPaginator} />
            </Section>
        </div>
    );
});

export default ShopsList;
