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
import {Inertia} from "@inertiajs/inertia";
import {Dropdown} from "@components/elements/Dropdown";
import {BiArrowBack} from "react-icons/all";
import DialogModal from "@components/modal/DialogModal";
import SecondaryButton from "@components/profile/SecondaryButton";
import {Shop} from "@/classes/Shop";
import {Response} from "@/types/Response";
import LoginModal from "@components/page/LoginModal";
import PageError from "./PageError";

const SpecLine: React.FC<{title: string, value: string|number, description?: string}> = React.memo(({title, value, description}) => {
    return (
        <div className="relative specs-line flex justify-between py-3 odd:bg-[#121212] even:bg-[#1c1c1c] md:even:bg-transparent -mx-5 px-5">
            <div className="specs__title flex grow md:border-b border-gray-600 border-dotted text-base pb-1 capitalize rounded-tl-none">
                <span>{title}</span>

                {description && <div className="z-10">
                    <Dropdown
                        align="right"
                        width="64"
                        contentClasses="rounded-md rounded-tr-none text-base leading-5 px-1.5 mr-7 -mt-5"
                        renderTrigger={() =>
                            <button className="text-xl ml-3 hover:text-red-500 z-0">&#128712;</button>
                        }
                    >
                        <div className={`specs-line__tooltip max-w-sm mx-2 py-1.5 text-base leading-5 normal-case`}>
                            {description}
                        </div>
                    </Dropdown>
                </div>}
            </div>

            <div className="specs__value md:w-1/2 pl-4 text-base capitalize">{value}</div>
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
                        <SpecLine title="Тип видеопамяти" value={good.GPU_VRAM_type}/>
                        <SpecLine title="Частота видеочипа" value={good.GPU_chip_frequency + ' МГц'}/>
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

        case 'RAM':
            let RAM_type = 'DDR';

            if (good.RAM_frequency < 400) RAM_type = 'DDR';
            else if (good.RAM_frequency < 1066) RAM_type = 'DDR2';
            else if (good.RAM_frequency < 2100) RAM_type = 'DDR3';
            else if (good.RAM_frequency < 3600) RAM_type = 'DDR4';
            else RAM_type = 'DDR5';

            return (
                <>
                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Основные параметры</h5>

                        <SpecLine title="Тип памяти" value={RAM_type}/>
                        <SpecLine title="Суммарный объём памяти всего комплекта" value={good.RAM_size + ' ГБ'}/>
                        <SpecLine title="Объём одного модуля памяти" value={good.RAM_size / good.RAM_channels + ' ГБ'}/>
                        <SpecLine title="Тактовая частота" value={good.RAM_frequency + ' МГц'}/>
                    </div>

                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Прочие параметры</h5>

                        <SpecLine title="Тепловыделение" value={good.TDP + ' Вт'}/>
                        <SpecLine title="Потребление энергии" value={good.power + ' Вт'}/>

                    </div>
                </>
            );

        case 'PSU':
            let PSU_efficiency = good.PSU_efficiency == 'none' ? 'Отсутствует' : good.PSU_efficiency;
            return (
                <>
                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Основные параметры</h5>

                        <SpecLine title="Мощность (номинал)" value={good.PSU_power_supply + ' Вт'}/>
                        <SpecLine title="Сертификат 80 PLUS" value={PSU_efficiency}/>
                        <SpecLine title="Тепловыделение" value={good.TDP + ' Вт'} description="Нерассеянное тепло, выделяемое БП. Может повлиять на общую температуру майнинг фермы."/>

                    </div>
                </>
            );

        case 'case':
            return (
                <>
                    <div className="mb-4">
                        <h5 className="spec-header font-bold text-xl mb-1.5 font-sans">Основные параметры</h5>

                        <SpecLine title="Материал" value={good.case_material_rus + ' Вт'}/>
                        <SpecLine title="Критическая температура" value={good.case_critical_temp + '°C'} description="Максимальная температура, которую выдерживает каркас"/>
                        <SpecLine title="Вместимость видеокарт" value={good.case_GPUs_count + ' шт.'}/>
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

    if(!page.props.good)
        return <PageError title="Ууупс..." description="А такого товара не существует..." />

    const auth = page.props.user;
    const good = Part.createByType(page.props.good);
    const shop = new Shop(page.props.ownerShop);

    const back = () => {
        window.history.back();
    }

    const [isConfirmBuy, setIsConfirmBuy] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    function confirmBuy() {
        setLoginModal(true);
        if(auth) setIsConfirmBuy(true);
    }

    const closeConfirmBuy = () => {
        setIsConfirmBuy(false);
    }

    const buy = async () => {
        const result = await window.axios.post<any, Response<any>>(route('user.buy-good'), {
            shop_slug: shop.slug,
            good_slug: good.slug
        });

        console.log(result, 123)

        closeConfirmBuy();
    }

    const BuyButton = () => {
        if(page.props.good.isDeleted) return (
            <SecondaryButton
                className="py-2 px-3 text-base font-sans md:w-36 flex items-center justify-center leading-4 normal-case"
                disabled
            >Нет в продаже</SecondaryButton>
        );

        if(good.count) return (
            <Button
                className="py-2 px-3 text-base font-sans md:w-36 flex items-center justify-center capitalize"
                onClick={confirmBuy}
            >Купить</Button>
        );

        return (
            <SecondaryButton
                className="py-2 px-3 text-base font-sans md:w-36 flex items-center justify-center leading-4 normal-case"
                disabled
            >Нет в наличии</SecondaryButton>
        );
    }

    return (
        <div className="good-page max-w-5xl w-full">
            {/* @ts-ignore*/}
            <Head>
                <title>{`${shop.name} - ${good.name}`}</title>
                <meta name="description" content={`${good.name} в магазине электроники ${shop.name}.`} />
            </Head>

            <Section>
                <div className="flex items-center cursor-pointer w-max">
                    <BiArrowBack size="30" onClick={back}/>
                    <h2 onClick={back} className="text-3xl font-medium font-play ml-3">{shop.name}</h2>
                </div>
            </Section>

            {/* Overview section */}
            <Section>
                <div className="good-overview flex justify-between md:flex-row flex-col">
                    {/* Image Block */}
                    <div className="good-overview__image flex flex-col md:mr-3 md:max-w-md">
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

                                <BuyButton/>

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
                    <h2 className="good-specs_title font-roboto text-2xl mb-5 tracking-wide">Характеристики {page.props.good.rawName ?? good.name}</h2>

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

            {/* Buy confirmation modal */}
            <DialogModal isOpen={isConfirmBuy} onClose={closeConfirmBuy}>
                <DialogModal.Content title={'Подтверждение'}>
                    <span>
                        Вы уверены, что хотите купить {good.name}?<br/>
                        Время доставки {shop.delivery_time}ч.
                    </span>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={closeConfirmBuy}>Отмена</SecondaryButton>

                    <Button
                        onClick={buy}
                        className="ml-2"
                    >
                        Купить
                    </Button>
                </DialogModal.Footer>
            </DialogModal>

            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
        </div>
    );
});

export default Good;
