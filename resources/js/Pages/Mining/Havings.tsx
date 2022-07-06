import React from 'react';
import {IPage} from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "@hooks/useTypedPage";
import {IPaginator} from "@/types/IPaginator";
import Paginator from "@components/elements/Paginator";
import {HavingStateType, IHaving} from "@/types/IHaving";
import {TabLinks} from "@components/elements/TabsLink";
import Button from "../../components/elements/Button";
import SecondaryButton from "../../components/elements/SecondaryButton";

const HavingState: React.FC<{ havingState: HavingStateType }> = React.memo(({havingState}) => {
    switch (havingState) {
        case 'not_used':
            return (
                <span
                    className="px-2 py-0.5 rounded-md border-gray-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >&bull; Не используется</span>
            );

        case 'used':
            return (
                <span
                    className="px-2 py-0.5 rounded-md border-green-500 text-green-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >&bull; Используется</span>
            );

        case 'needs_repair':
            return (
                <span
                    className="px-2 py-0.5 rounded-md border-orange-500 text-orange-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >&bull; Нужен ремонт</span>
            );

        case 'broken':
            return (
                <span
                    className="px-2 py-0.5 rounded-md border-red-600 text-red-600 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >&bull; Сломано</span>
            );
    }
});

const HavingFeatures: React.FC<{ having: IHaving }> = React.memo(({having}) => {
    return (
        <>
            {/* Warranty */}
            {having.good.shop.warranty ?
                <span
                    className="mr-2 px-2 py-0.5 rounded-md border-gray-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >
                        Гарантия
                </span>
                : null}

            {/* Is used market */}
            {having.good.shop.used_market ?
                <span
                    className="mr-2 px-2 py-0.5 rounded-md border-gray-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >
                    Б/у
                </span>
                : null}

            {/* For sale */}
            {having.for_sale ?
                <span
                    className="mr-2 px-2 py-0.5 rounded-md border-gray-500 border tracking-wider text-sm mt-2 whitespace-nowrap"
                >
                    Продаётся
                </span>
                : null}

            {/*  State  */}
            <HavingState havingState={having.state} />
        </>
    );
});

const HavingItem: React.FC<{ having: IHaving }> = React.memo(({having}) => {
    const part = having.good.part;
    const shop = having.good.shop;

    return (
        <li className="havings-list__item flex app-bg rounded-lg p-3 flex-col">
            <div className="flex justify-between">
                {/* IMAGE */}
                <div className="shrink-0 flex justify-center mb-3 mr-3 sm:mb-0">
                    <img
                        className="sm:h-32 md:h-36 sm:w-auto w-24 rounded-md "
                        src={part.image}
                        alt={part.name}
                    />
                </div>

                {/* Name-info */}
                <div className="shop-list__item-info flex-1 sm:ml-5 flex flex-col justify-between">
                    {/* Name */}
                    <h3 className="text-base sm:text-lg tracking-wide font-roboto leading-5 sm:leading-6">{part.name}</h3>

                    {/* Having state for desktop */}
                    <div className="hidden lg:flex justify-end">
                        <HavingFeatures having={having}/>
                    </div>
                </div>
            </div>

            {/* Having state for mobile */}
            <div className="lg:hidden flex flex-wrap">
                <HavingFeatures having={having}/>
            </div>

            {/* Buttons */}
            {/*<div className="flex mt-3 justify-end space-x-3">*/}
            {/*    <Button className="bg-transparent border-gray-500 border text-gray-500 hover:bg-gray-400">*/}
            {/*        Продать*/}
            {/*    </Button>*/}

            {/*    <Button>*/}
            {/*        Посмотреть*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </li>
    );
});

const Havings: IPage = React.memo(() => {
    const page = useTypedPage<{
        havings: IPaginator<IHaving>
    }>();

    const havingsPaginator = page.props.havings;

    const typesLinks = [
        {
            title: 'все',
            hrefName: 'admin.parts.index'
        },
        {
            title: 'Видеокарты',
            hrefName: 'admin.parts.GPU',
        },
        {
            title: 'Платформы',
            hrefName: 'admin.parts.platform'
        },
        {
            title: 'ОЗУ',
            hrefName: 'admin.parts.RAM'
        },
        {
            title: 'БП',
            hrefName: 'admin.parts.PSU'
        },
        {
            title: 'Каркас',
            hrefName: 'admin.parts.case'
        }
    ];

    return (
        <MiningLayout title="Ваши комплектующие"
                      description="Распоряжайтесь купленными вами комплектующими: собирайте из них майнинг фермы, продавайте на б/у рынке.">

            <div className="max-w-2xl">
                <Section>
                    {/* Select type */}
                    <div className="parts-list__links rounded-lg app-bg shadow-md mb-4">
                        <TabLinks links={typesLinks} small/>
                    </div>

                    <ul className="havings-list mb-5 space-y-6">
                        {havingsPaginator.data.map(having => {
                            console.log(having);
                            return <HavingItem key={having.id} having={having}/>
                        })}
                    </ul>
                </Section>

                <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5 w-fit">
                    <Paginator paginator={havingsPaginator}/>
                </div>
            </div>
        </MiningLayout>
    );
});

export default Havings;
