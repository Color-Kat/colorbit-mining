import React from "react";
import {ControlledInput} from "../../elements/form/ControlledInput";
import useTypedPage from "../../../hooks/useTypedPage";

export const ThirdStage: React.FC<{
    data: any,
    setData: (name: string, data: any) => void,
    errors: any
}>
    = ({data, setData, errors}) => {

    const pageProps = useTypedPage().props;

    console.log(pageProps);

    return (
        <>
            {/* VRAM_size */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Количество видеопамяти"
                placeholder="в ГБ"
                type="number"
                min="0"
                name="GPU_VRAM_size"
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
