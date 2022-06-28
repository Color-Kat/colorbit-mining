import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "../types/IPage";
import {Head} from "@inertiajs/inertia-react";
import {Part} from "../classes/Part";
import {Section} from "../components/page/Section";
import Button from "../components/elements/Button";
import {PageTitle} from "../components/page/PageTitle";
import {IShop} from "../types/shops/IShop";


const Good: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{good: any, ownerShop: IShop}>();

    console.log(page)

    const good = Part.createByType(page.props.good);
    const shop = page.props.ownerShop;

    return (
        <div className="good-page max-w-5xl w-full">
            {/* @ts-ignore*/}
            <Head>
                <title>{`${shop.name} - ${good.name}`}</title>
                <meta name="description" content={`${good.name} в магазине электроники ${shop.name}.`} />
            </Head>

            <PageTitle title={shop.name} description="" />

            <Section>
                <div className="good-card flex justify-between">
                    <div className="good-card__image flex flex-col">
                        <img className="flex flex-1" src={good.image} alt={good.name}/>
                        <span>Код товара: {page.props.good.id}</span>
                    </div>

                    <div className="good-card__info flex flex-col">
                        <div className="flex justify-between">
                            <h2 className="font-play text-2xl mr-1.5">{good.name}</h2>
                            <h3 className="font-roboto text-lg text-gray-500">{good.vendor}</h3>
                        </div>

                        <div className="good-card__control rounded-lg app-bg text-app shadow-lg my-5 flex flex-col p-3">
                            <div className="good-card__price-section flex">
                                <div className="flex grow text-2xl tracking-wide font-roboto font-bold flex items-center mr-2 rounded-md bg-gradient-to-br from-transparent to-[#121212]">{good.price}$</div>
                                <Button className="py-2 px-3 text-base font-sans md:w-36 flex items-center justify-center capitalize">Купить</Button>
                            </div>

                            <div
                                className="good-card__shop-info flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5 mt-3">
                                {shop.warranty ? <span
                                    className="px-2 py-1 rounded-md border-gray-500 border tracking-wider">Гарантия</span> : null}
                                <span
                                    className="px-2 py-1 rounded-md border-gray-500 border">В наличии: {good.count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

        </div>
    );
});

export default Good;