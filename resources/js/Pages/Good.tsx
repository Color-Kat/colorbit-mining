import React, {useState} from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {Head} from "@inertiajs/inertia-react";

import {IPage} from "@/types/IPage";
import {Part} from "@/classes/Part";
import {IShop} from "@/types/shops/IShop";
import {partTypeRus} from "@/types/toRus";
import {PartType} from "@/types/parts/IBasePart";
import {PartT} from "@/types/parts/PartT";

import {Section} from "@components/page/Section";
import Button from "@components/elements/Button";
import {PageTitle} from "@components/page/PageTitle";
import {Inertia} from "@inertiajs/inertia";
import {Dropdown} from "../components/elements/Dropdown";

const SpecLine: React.FC<{title: string, value: string|number, description?: string}> = React.memo(({title, value, description}) => {
    const [isShowTooltip, setIsShowTooltip] = useState(false);

    const showTooltip = () => {
        setIsShowTooltip(prev => !prev);
    }

    return (
        <div className="relative specs-line flex justify-between py-3 odd:bg-[#121212] even:bg-[#1c1c1c] md:even:bg-transparent -mx-5 px-5">
            <div className="specs__title flex grow md:border-b border-gray-600 border-dotted text-base pb-1 capitalize rounded-tl-none">
                <span>{title}</span>
                {/*<button className="text-xl ml-3 hover:text-red-500" onClick={showTooltip}>&#128712;</button>*/}

                <div className="z-10">
                    <Dropdown
                        align="left"
                        width="48"
                        contentClasses="rounded-md rounded-tl-none text-base leading-5 px-1.5 ml-7 -mt-5"
                        renderTrigger={() =>
                            <button className="text-xl ml-3 hover:text-red-500 z-0" onClick={showTooltip}>&#128712;</button>
                        }
                    >
                        <div className={`specs-line__tooltip  p-2 max-w-sm mx-2`}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores corporis officiis omnis ratione? Ab doloremque eius facilis hic minus modi nisi nulla, pariatur praesentium provident repellendus sed tempora velit voluptas.
                        </div>
                    </Dropdown>
                </div>
            </div>

            <div className="specs__value md:w-1/2 pl-4 text-base capitalize">{value}</div>

            {/*<div className={`specs-line__tooltip ${isShowTooltip ? 'flex' : 'hidden'} absolute left-1/4 top-3 app-bg rounded-md rounded-tl-none p-2 max-w-sm mx-2 z-10`}>*/}
            {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores corporis officiis omnis ratione? Ab doloremque eius facilis hic minus modi nisi nulla, pariatur praesentium provident repellendus sed tempora velit voluptas.*/}
            {/*</div>*/}


        </div>
    );
});

const MainSpecs: React.FC<{good: PartT<PartType>}> = ({good}) => {
    switch (good.type){
        case 'GPU':
            return (
                <>
                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Основные параметры</h5>

                        <SpecLine title="Количество видеопамяти" value={good.GPU_VRAM_size + ' ГБ'}/>
                        <SpecLine title="Частота видеопамяти" value={good.GPU_VRAM_frequency + ' МГц'}/>
                        <SpecLine title="Тип видеопамяти" value={good.GPU_VRAM_type}/>
                        <SpecLine title="Тепловыделение" value={good.TDP + ' Вт'}/>
                        <SpecLine title="Потребление энергии" value={good.power + ' Вт'}/>
                    </div>

                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Система охлаждения</h5>

                        <SpecLine title="Тип охлаждения" value={good.GPU_fans_count == 0 ? 'пассивное' : 'активное'}/>
                        <SpecLine title="Количество вентиляторов" value={good.GPU_fans_count}/>
                    </div>
                </>
            );

        case 'platform':
            return (
                <>
                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Процессор</h5>

                        <SpecLine title="Количество ядер" value={good.platform_cors_count + ' ГБ'}/>
                        <SpecLine title="Количество потоков" value={good.platform_threads_count + ' МГц'}/>
                        <SpecLine title="Частота" value={good.platform_frequency}/>
                        <SpecLine title="Потребление энергии" value={good.power + ' Вт'}/>
                    </div>

                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Материнская плата</h5>

                        <SpecLine title="Количество каналов памяти" value={good.platform_RAM_slots}/>
                        <SpecLine title="Остаточное тепловыделение" value={good.TDP + ' Вт'} description="Тепло, которое не рассеивается кулером. Чем больше остаточное тепловыделение, тем больше общий нагрев фермы."/>
                    </div>
                </>
            );

        default:
            return <span>123</span>;
    }
}

const Good: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{good: any, ownerShop: IShop}>();

    console.log(page)

    const good = Part.createByType(page.props.good);
    const shop = page.props.ownerShop;

    const toShop = () => {
        Inertia.visit(route('shop', shop.slug));
    }

    return (
        <div className="good-page max-w-5xl w-full">
            {/* @ts-ignore*/}
            <Head>
                <title>{`${shop.name} - ${good.name}`}</title>
                <meta name="description" content={`${good.name} в магазине электроники ${shop.name}.`} />
            </Head>

            <div onClick={toShop} className="cursor-pointer">
                <PageTitle title={shop.name} description="" />
            </div>

            {/* Overview section */}
            <Section>
                <div className="good-overview flex justify-between md:flex-row flex-col">
                    {/* Image Block */}
                    <div className="good-overview__image flex flex-col md:mr-3">
                        <img className="flex flex-1 max-w-full h-auto" src={good.image} alt={good.name}/>
                        <span className="text-gray-500 mt-2 hidden md:block">Код товара: {page.props.good.id}</span>
                    </div>

                    {/* Info Block */}
                    <div className="good-overview__info flex flex-col">
                        {/* Name & Vendor */}
                        <div className="flex justify-between">
                            <h2 className="font-play text-2xl mr-1.5">{good.name}</h2>
                            <h3 className="font-roboto text-lg text-gray-500 hidden md:block">{good.vendor}</h3>
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

                    {/*  Good ID and Vendor for mobile  */}
                    <div className="flex md:hidden justify-between items-center">
                        <h3 className="font-roboto text-xl text-gray-500">{good.vendor}</h3>
                        <span className="text-gray-500">Код товара: {page.props.good.id}</span>
                    </div>
                </div>
            </Section>

            {/* Specifications section */}
            <Section>
                <div className="good-specs lex flex-col">
                    <h2 className="good-specs_title font-play text-2xl mb-5 tracking-wide">Характеристики {good.name}</h2>

                    <div className="good-specs specs">
                        <div className="mb-4">
                            <h5 className="specs-header font-bold text-xl mb-1.5 font-sans">Общие параметры</h5>

                            <SpecLine title="Тип" value={partTypeRus[good.type]}/>
                            <SpecLine title="Вендор" value={good.vendor}/>
                            <SpecLine title="Модель" value={page.props.good.rawName ?? good.name}/>
                        </div>



                        <MainSpecs good={good}/>
                    </div>
                </div>
            </Section>
        </div>
    );
});

export default Good;
