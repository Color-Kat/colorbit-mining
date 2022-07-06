import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import Paginator from "@components/elements/Paginator";
import {IShop, IShopPart} from "@/types/shops/IShop";
import {Inertia} from "@inertiajs/inertia";
import {Section} from "@components/page/Section";
import Button from "@components/elements/Button";

import {Shop as ShopClass} from "@/classes/Shop";
import {Head} from "@inertiajs/inertia-react";
import {BiArrowBack} from "react-icons/all";
import PageError from "./PageError";


const ShopPartItem: React.FC<{ part: IShopPart, shop: IShop }> = ({part, shop}) => {
    const route = useRoute();

    const goToProduct = () => {
        Inertia.get(route('good', {
            shop_slug: shop.slug,
            product_slug: part.slug
        }));
    }

    return (
        <li onClick={goToProduct} className="cursor-pointer col-span-2 -mb-4 sm:m-0">
            <Section>
                <div className="shop-list__item flex sm:justify-between flex-col sm:flex-row">
                    <div className="flex justify-between">
                        <div className="shrink-0 flex justify-center mb-3 mr-3 sm:mb-0">
                            <img
                                className="sm:h-32 md:h-36 sm:w-auto w-24 rounded-md "
                                src={part.image}
                                alt={part.name}
                            />
                        </div>

                        <div className="shop-list__item-info flex-1 sm:ml-5 flex flex-col justify-between">
                            <h3 className="text-base sm:text-lg tracking-wide font-roboto leading-5 sm:leading-6">{part.name}</h3>

                            <div
                                className="hidden sm:flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5">
                                {shop.warranty ? <span
                                    className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
                                <span
                                    className="px-2 py-0.5 rounded-md border-gray-500 border">В наличии: {part.pivot.count}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex sm:hidden tracking-wider whitespace-nowrap flex-wrap justify-end text-sm mt-2 space-x-1">
                        {shop.warranty ?
                            <span className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
                        <span
                            className="px-2 py-0.5 rounded-md border-gray-500 border">В наличии: {part.pivot.count}</span>
                    </div>

                    <div className="flex sm:flex-col justify-between items-center sm:items-end mt-3 sm:m-0">
                        <h3 className="text-2xl tracking-wide font-roboto font-bold sm:mb-2">{part.price}$</h3>

                        {part.pivot.count > 0
                            ? <Button className="self-end" onClick={goToProduct}>Перейти</Button>
                            : <Button className="self-end bg-transparent hover:bg-transparent border border-gray-500 hover:border-red-500" onClick={goToProduct}>Нет в наличии</Button>
                        }
                    </div>
                </div>


            </Section>
        </li>
    );
}

const Shop: IPage = React.memo(() => {
    const page = useTypedPage<{shop: IShop}>();

    const shop = new ShopClass(page.props.shop);
    const partsPaginator = page.props.shop.parts;

    const back = () => {
        window.history.back();
    }

    if(!shop) return <PageError title="Здесь не продают комплектующие" description="Вы дверью ошиблись."/>

    return (
        <div className="shops-list-page max-w-3xl w-full">
            {/* @ts-ignore*/}
            <Head>
                <title>{`${shop.name} - оборудование для майнинга`}</title>
                <meta name="description" content={shop.description} />
            </Head>

            <Section>
                <div className="flex items-center cursor-pointer w-max">
                    <BiArrowBack size="30" onClick={back}/>
                    <h2 onClick={back} className="text-3xl font-medium font-play ml-3">{shop.name}</h2>
                </div>
            </Section>

            {/*<PageTitle title={shop.name} description={shop.description}/>*/}

            <ul className="grid sm:block grid-cols-2 gap-2">
                {partsPaginator.data.map(part => {
                    return (
                        <ShopPartItem key={part.part_id} part={part} shop={shop}/>
                    )
                })}
            </ul>

            <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                <Paginator paginator={partsPaginator}/>
            </div>
        </div>
    );
});

export default Shop;
