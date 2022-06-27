import React from 'react';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {Section} from "@components/page/Section";
import {IPaginator} from "@/types/IPaginator";
import {IShopListItem} from "@/types/shops/IShopListItem";
import Paginator from "@components/elements/Paginator";
import {PageTitle} from "@components/page/PageTitle";
import Button from "../components/elements/Button";
import CLink from "../components/CLink";
import useRoute from "../hooks/useRoute";
import {Inertia} from "@inertiajs/inertia";

const ShopListItem: React.FC<{shop: IShopListItem}> = ({shop}) => {
    const route = useRoute();
    const deliveryTime = shop.delivery_time.split(':')[0];

    const goToShop = () => {
        Inertia.get(route('shop', shop.slug));
    }

    return (
        <li onClick={goToShop} className="cursor-pointer">
            <Section>
                <div className="shop-list__item flex flex-col sm:flex-row sm:justify-between">
                    <div className="shrink-0 flex justify-center mb-3 sm:mb-0">
                        <img
                            className="xsm:h-24 xsm:w-auto w-full rounded-md "
                            src={shop.image}
                            alt={shop.name}
                        />
                    </div>

                    <div className="shop-list__item-info flex-1 sm:ml-5 flex flex-col justify-between">
                        <h3 className="text-3xl tracking-wide font-play">{shop.name}</h3>
                        <div className="tracking-wider whitespace-nowrap flex flex-wrap items-end text-sm">
                            {shop.warranty ? <span className="bg-gray-400 text-gray-900 py-1 px-2 rounded-md mr-2 mt-2">Гарантия</span> : null}
                            {shop.used_market ? <span className="bg-gray-400 text-gray-900 py-1 px-2 rounded-md mr-2 mt-2">Б/y</span> : null}
                            <span className="bg-gray-400 text-gray-900 py-1 px-2 rounded-md mt-2">Время доставки: {deliveryTime}ч.</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="border-red-600 border-t w-full mb-2 mt-4"/>

                    <Button className="self-end" onClick={goToShop}>Перейти</Button>
                </div>
            </Section>
        </li>
    );
}

const ShopsList: IPage = React.memo(() => {
    const page = useTypedPage<{
        shopsList: IPaginator<IShopListItem>
    }>();

    const shopsListPaginator = page.props.shopsList;
    const currentShops = shopsListPaginator.data;

    return (
        <div className="shops-list-page max-w-3xl w-full">
            <PageTitle title="Магазины" description="Ищите комплектующие? Загляните в один их этих магазинов."/>

            <ul className="shop-list">
                {currentShops.map(shop => (
                    <ShopListItem shop={shop} key={shop.id}/>
                ))}
            </ul>

            <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                <Paginator paginator={shopsListPaginator}/>
            </div>
        </div>
    );
});

export default ShopsList;
