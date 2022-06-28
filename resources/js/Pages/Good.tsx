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
import {partTypeRus} from "../types/toRus";

const SpecLine: React.FC<{title: string, value: string}> = ({title, value}) => {
    return (
        <div className="specs-line flex justify-between my-3">
            <div className="specs__title flex grow border-b border-gray-500 text-base pb-1 capitalize">{title}</div>
            <div className="specs__value w-1/2 pl-4 text-base capitalize">{value}</div>
        </div>
    );
}

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

            {/* Overview section */}
            <Section>
                <div className="good-overview flex justify-between">
                    {/* Image Block */}
                    <div className="good-overview__image flex flex-col md:mr-3">
                        <img className="flex flex-1 max-w-full h-auto" src={good.image} alt={good.name}/>
                        <span className="text-gray-500 mt-2">Код товара: {page.props.good.id}</span>
                    </div>

                    {/* Info Block */}
                    <div className="good-overview__info flex flex-col">
                        {/* Name & Vendor */}
                        <div className="flex justify-between">
                            <h2 className="font-play text-2xl mr-1.5">{good.name}</h2>
                            <h3 className="font-roboto text-lg text-gray-500">{good.vendor}</h3>
                        </div>

                        {/* Buy section */}
                        <div className="good-overview__control rounded-lg app-bg text-app shadow-lg my-5 flex flex-col p-3">
                            {/* Price & buy */}
                            <div className="good-overview__price-section flex">
                                <div className="flex grow text-2xl tracking-wide font-roboto font-bold flex items-center mr-2 rounded-md bg-gradient-to-br from-transparent to-[#121212]">{good.price}$</div>
                                <Button className="py-2 px-3 text-base font-sans md:w-36 flex items-center justify-center capitalize">Купить</Button>
                            </div>

                            <div
                                className="good-overview__shop-info flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5 mt-3">
                                {shop.warranty ? <span
                                    className="px-2 py-1 rounded-md border-gray-500 border tracking-wider">Гарантия</span> : null}
                                <span
                                    className="px-2 py-1 rounded-md border-gray-500 border">В наличии: {good.count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Specifications section */}
            <Section>
                <div className="good-specs lex flex-col">
                    <h2 className="good-specs_title font-play text-2xl mb-5 tracking-wide">Характеристики {good.name}</h2>

                    <div className="good-specs specs">
                        <div className="mb-4">
                            <h5 className="specs-header font-bold text-lg font-sans">Общие параметры</h5>

                            <SpecLine title="Тип" value={partTypeRus[good.type]}/>
                            <SpecLine title="Вендор" value={good.vendor}/>
                            <SpecLine title="Название" value={page.props.good.rawName ?? good.name}/>
                        </div>

                        <div className="">
                            <h5 className="spec-header font-bold text-lg font-sans">Основные параметры</h5>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
});

export default Good;
