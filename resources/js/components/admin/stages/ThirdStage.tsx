import React from "react";
import {ControlledInput} from "@components/elements/form/ControlledInput";
import useTypedPage from "@hooks/useTypedPage";
import {BreakdownsPartType, ShopsPartType} from "@/types/parts/IPart";
import {ControlledCheckbox} from "@components/elements/form/ControlledCheckbox";

export const ThirdStage: React.FC<{
    data: any,
    setData: ((name: string, data: any) => void) & ((prev: any) => any),
    errors: any
}>
    = ({data, setData, errors}) => {

    const pageProps = useTypedPage<{
        breakdowns: BreakdownsPartType,
        shops: ShopsPartType
    }>().props;

    // Transform to {title, value} format
    const breakdownOptions = pageProps.breakdowns.map(breakdown => ({
        title: breakdown.title + ` (условие - ${breakdown.condition})`,
        value: breakdown.id
    }));

    const shopOptions = pageProps.shops.map(shop => ({
        title: shop.name,
        value: shop.id
    }));

    return (
        <>
            {/* Breakdowns */}
            <ControlledCheckbox
                data={data} setData={setData}
                name="breakdown_ids"
                title="Частые поломки"
                options={breakdownOptions}
            />

            {/* Shops */}
            <ControlledCheckbox
                data={data} setData={setData}
                name="shop_ids"
                title="Продаётся в"
                options={shopOptions}
            />

            {/* Count */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Количество"
                type="number"
                placeholder="Кол-во в выбранных магазинах (Шт.)"
                name="count"
            />

            {/* Price */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Цена"
                name="price"
            />
        </>
    );
}
