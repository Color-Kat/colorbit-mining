import React from "react";
import {ControlledSelect} from "../../elements/form/ControlledSelect";
import {ControlledInput} from "../../elements/form/ControlledInput";

const VRAM_type_options = [
    {
        title: 'GDDR4',
        value: 'GDDR4'
    },
    {
        title: 'GDDR5',
        value: 'GDDR5'
    },
    {
        title: 'GDDR5x',
        value: 'GDDR5x'
    },
    {
        title: 'GDDR6',
        value: 'GDDR6'
    },
    {
        title: 'GDDR6x',
        value: 'GDDR6x'
    }
];

export const SecondStage: React.FC<{
    data: any,
    setData: (name: string, data: any) => void,
    errors: any
}>
    = ({data, setData, errors}) => {

    switch (data.type) {
        case 'GPU':
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

                    {/* VRAM_frequency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Частота видеопамяти"
                        placeholder="в мГц"
                        type="number"
                        min="0"
                        name="GPU_VRAM_frequency"
                    />

                    {/* VRAM_type */}
                    <ControlledSelect
                        data={data} setData={setData}
                        title="Тип памяти"
                        name="GPU_VRAM_type"
                        options={VRAM_type_options}
                    />

                    {/* fans_count */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество вентиляторов"
                        placeholder="0 - пассивное"
                        type="number"
                        min="0"
                        name="GPU_fans_count"
                    />

                    {/* fans_efficiency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Эффективность вентиляторов в %"
                        placeholder="От 0 до 100"
                        type="number"
                        min="0"
                        max="100"
                        name="GPU_fans_efficiency"
                    />
                </>
            );

        case 'platform':
            return (
                <>
                    {/* cors_count */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество ядер ЦП"
                        type="number"
                        min="1"
                        name="platform_cors_count"
                    />

                    {/* threads_count */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество потоков ЦП"
                        type="number"
                        min="1"
                        name="platform_threads_count"
                    />

                    {/* frequency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Частота ЦП"
                        type="number"
                        min="100"
                        placeholder="В ГГц"
                        name="platform_frequency"
                    />

                    {/* RAM_slots */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество слотов ОЗУ"
                        type="number"
                        min="1"
                        name="platform_RAM_slots"
                    />

                </>
            );

        case 'RAM':
            return (
                <>
                    {/* size */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Объём ОЗУ"
                        placeholder="В ГБ"
                        type="number"
                        min="1"
                        name="RAM_size"
                    />

                    {/* frequency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Частота ОЗУ"
                        placeholder="В МГц"
                        type="number"
                        min="1"
                        name="RAM_frequency"
                    />

                    {/* channels */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество каналов ОЗУ"
                        type="number"
                        min="1"
                        name="RAM_channels"
                    />
                </>
            );

        default:
            return <span>Такого типа не существует</span>
    }
}
