import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "../types/IPage";
import {Head} from "@inertiajs/inertia-react";
import {Part} from "../classes/Part";
import {Section} from "../components/page/Section";
import Button from "../components/elements/Button";
import {PageTitle} from "../components/page/PageTitle";


const Good: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{good: any}>();

    console.log(page)

    const good = Part.createByType(page.props.good);

    return (
        <div className="good-page max-w-5xl w-full">
            <PageTitle title={} description={} />

            {/* @ts-ignore*/}
            <Head>
                <title>{good.name}</title>
                <meta name="description" content="Покупка комплектующих для майнинг фермы" />
            </Head>

            <Section>
                <div className="good-card flex justify-between">
                    <div className="good-card__image flex flex-col">
                        <img className="flex flex-1" src={good.image} alt={good.name}/>
                        <span>Код товара: {page.props.good.id}</span>
                    </div>

                    <div className="good-card__info flex flex-col">
                        <div className="flex justify-between">
                            <h2>{good.name}</h2>
                            <h3>{good.vendor}</h3>
                        </div>

                        <div className="good-card__control rounded-lg app-bg-dark text-app shadow-md my-5 flex flex-col">
                            <div className="good-card__price-section flex justify-between">
                                <span className="flex shrink-1">{good.price}$</span>
                                <Button className="py-2 px-6">Купить</Button>
                            </div>

                            <div
                                className="good-card__shop-info flex tracking-wider whitespace-nowrap flex-wrap items-end text-sm space-x-1.5">
                                {true ? <span
                                    className="px-2 py-0.5 rounded-md border-gray-500 border">Гарантия</span> : null}
                                <span
                                    className="px-2 py-0.5 rounded-md border-gray-500 border">В наличии: {good.count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

        </div>
    );
});

export default Good;
