import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {PageTitle} from "@components/page/PageTitle";
import Paginator from "@components/elements/Paginator";
import {IShop, IShopPart} from "@/types/shops/IShop";
import {Inertia} from "@inertiajs/inertia";
import {Section} from "../components/page/Section";
import Button from "../components/elements/Button";


const ShopPartItem: React.FC<{part: IShopPart, shop: IShop}> = ({part, shop}) => {
    const route = useRoute();

    console.log(part)

    const goToProduct = () => {
        Inertia.get(route('product', [shop.slug, part.slug]));
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

                            <div className="hidden sm:flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5">
                                {shop.warranty ? <span className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
                                <span className="px-2 py-0.5 rounded-md border-gray-500 border">В наличии: {part.pivot.count}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex sm:hidden tracking-wider whitespace-nowrap flex-wrap justify-end text-sm mt-2 space-x-1">
                        {shop.warranty ? <span className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
                        <span className="px-2 py-0.5 rounded-md border-gray-500 border">В наличии: {part.pivot.count}</span>
                    </div>

                    <div className="flex sm:flex-col justify-between items-center sm:items-end mt-3 sm:m-0">
                        <h3 className="text-2xl tracking-wide font-roboto font-bold sm:mb-2">{part.price}$</h3>

                        <Button className="self-end" onClick={goToProduct}>Перейти</Button>
                    </div>
                </div>


            </Section>
        </li>
    );
}

const Shop: IPage = React.memo(() => {
    const page = useTypedPage<{shop: IShop}>();

    const shop = page.props.shop;
    const partsPaginator = page.props.shop.parts;

    return (
        <div className="shops-list-page max-w-3xl w-full">
            <PageTitle title={shop.name} description={shop.description}/>

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
