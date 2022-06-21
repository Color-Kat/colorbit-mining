import React from "react";
import {ControlledInput} from "@components/elements/form/ControlledInput";
import useTypedPage from "@hooks/useTypedPage";
import {BreakdownsPartType, ShopsPartType} from "@/types/parts/IPart";
import {ControlledCheckbox} from "@components/elements/form/ControlledCheckbox";

export const ThirdStage: React.FC<{
    data: any,
    setData: (name: string, data: any) => void,
    errors: any
}>
    = ({data, setData, errors}) => {

    const pageProps = useTypedPage<{
        breakdowns: BreakdownsPartType,
        shops: ShopsPartType
    }>().props;

    // Transform to {title, value} format
    const breakdowns = pageProps.breakdowns.map(breakdown => ({
        title: breakdown.title,
        value: breakdown.id.toString()
    }));
    const shops = pageProps.shops;

    console.log(pageProps);

    return (
        <>
            {/* Breakdowns */}
            <ControlledCheckbox
                data={data} setData={setData}
                name="breakdowns"
                title="Частые поломки"
                options={breakdowns}
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
