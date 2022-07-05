import React from 'react';
import {IPage} from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "../../hooks/useTypedPage";
import {IPaginator} from "../../types/IPaginator";
import Paginator from "../../components/elements/Paginator";
import {IHaving} from "../../types/IHaving";
import {TabLinks} from "../../components/elements/TabsLink";

const HavingItem: React.FC<{ having: IHaving }> = ({having}) => {
    const part = having.good.part;
    const shop = having.good.shop;

    return (
        <li className="havings-list__item flex app-bg rounded-lg p-3 flex-col md:flex-row">
            <div className="flex justify-between">
                {/* IMAGE */}
                <div className="shrink-0 flex justify-center mb-3 mr-3 sm:mb-0">
                    <img
                        className="sm:h-32 md:h-36 sm:w-auto w-24 rounded-md "
                        src={part.image}
                        alt={part.name}
                    />
                </div>

                {/*  */}
                <div className="shop-list__item-info flex-1 sm:ml-5 flex flex-col justify-between">
                    <h3 className="text-base sm:text-lg tracking-wide font-roboto leading-5 sm:leading-6">{part.name}</h3>

                    <div
                        className="hidden sm:flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5"
                    >
                        {shop.warranty
                            ? <span className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span>
                            : null}
                    </div>
                </div>
            </div>

            <div
                className="flex sm:hidden tracking-wider whitespace-nowrap flex-wrap justify-end text-sm mt-2 space-x-1">
                {shop.warranty ?
                    <span className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
            </div>

            <div className="flex sm:flex-col justify-between items-center sm:items-end mt-3 sm:m-0">
                <h3 className="text-2xl tracking-wide font-roboto font-bold sm:mb-2">{part.price}$</h3>
            </div>
        </li>
    );
}

const Havings: IPage = React.memo(() => {
    const page = useTypedPage<{
        havings: IPaginator<IHaving>
    }>();

    const havingsPaginator = page.props.havings;

    console.log(havingsPaginator);

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

            <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                <Paginator paginator={havingsPaginator}/>
            </div>
        </MiningLayout>
    );
});

export default Havings;
