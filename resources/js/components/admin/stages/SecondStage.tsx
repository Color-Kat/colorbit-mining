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

const PSU_efficiency_options = [
    {
        title: 'Отсутствует',
        value: 'none'
    },
    {
        title: 'Bronze',
        value: 'bronze'
    },
    {
        title: 'Silver',
        value: 'silver'
    },
    {
        title: 'Gold',
        value: 'gold'
    },
    {
        title: 'Platinum',
        value: 'platinum'
    },
    {
        title: 'titanium',
        value: 'titanium'
    }
];

const case_material_options = [
    {
        title: 'Дерево',
        value: 'wood'
    },
    {
        title: 'Железо',
        value: 'iron'
    },
    {
        title: 'Алюминий',
        value: 'aluminium'
    },
    {
        title: 'титан',
        value: 'titanium'
    },
];

export const SecondStage: React.FC<{
    data: any,
    setData: (name: string, data: any) => void,
    errors: any
}>
    = (({data, setData, errors}) => {

    switch (data.type) {
        case 'GPU':
            return (
                <>
                    {/* VRAM_size */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Количество видеопамяти, ГБ"
                        placeholder="в ГБ"
                        type="number"
                        min="0"
                        name="GPU_VRAM_size"
                    />

                    {/* VRAM_type */}
                    <ControlledSelect
                        data={data} setData={setData}
                        title="Тип памяти"
                        name="GPU_VRAM_type"
                        options={VRAM_type_options}
                    />

                    {/* VRAM_bit */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Разрядность шины памяти, бит"
                        placeholder=""
                        type="number"
                        min="0"
                        name="GPU_VRAM_bit"
                    />

                    {/* VRAM_bandwidth */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Пропускная способность памяти, ГБ/с"
                        placeholder="в Гбайт/сек"
                        type="number"
                        min="0"
                        name="GPU_VRAM_bandwidth"
                    />

                    {/* Number of streaming processors */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Кол-во потоковых процессоров"
                        placeholder="Cuda для nvidia"
                        type="number"
                        min="0"
                        name="GPU_st_processors"
                    />

                    {/* chip_frequency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Частота видеочипа, МГц"
                        placeholder="в МГц"
                        type="number"
                        min="0"
                        name="GPU_chip_frequency"
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
                        title="Эффективность вентиляторов, %"
                        placeholder="От 0 до 100"
                        type="number"
                        min="0"
                        max="100"
                        name="GPU_fan_efficiency"
                    />

                    {/* TDP */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="TDP, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="TDP"
                    />

                    {/* Power */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Потребление энергии, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="power"
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
                        title="Частота ЦП, ГГц"
                        type="number"
                        min="0.1"
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

                    {/* TDP */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="TDP, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="TDP"
                    />

                    {/* Power */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Потребление энергии, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="power"
                    />
                </>
            );

        case 'RAM':
            return (
                <>
                    {/* size */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Объём ОЗУ, ГБ"
                        placeholder="В ГБ"
                        type="number"
                        min="1"
                        name="RAM_size"
                    />

                    {/* frequency */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Частота ОЗУ, МГц"
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

                    {/* TDP */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="TDP, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="TDP"
                    />

                    {/* Power */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Потребление энергии, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="power"
                    />
                </>
            );

        case 'PSU':
            return (
                <>
                    {/* power supply */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Мощность БП, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="1"
                        name="PSU_power_supply"
                    />

                    {/* frequency */}
                    <ControlledSelect
                        data={data} setData={setData}
                        title="Сертификат БП"
                        name="PSU_efficiency"
                        options={PSU_efficiency_options}
                    />

                    {/* TDP */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="TDP, Ватт"
                        placeholder="В Ватт"
                        type="number"
                        min="0"
                        name="TDP"
                    />
                </>
            );

        case 'case':
            return (
                <>
                    {/* case material */}
                    <ControlledSelect
                        data={data} setData={setData}
                        title="Материал каркаса"
                        name="case_material"
                        options={case_material_options}
                    />

                    {/* case material on rus */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Название материала"
                        placeholder="Осина, дуб"
                        name="case_material_rus"
                    />

                    {/* GPUs_slots */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Кол-во слотов для видеокарты"
                        type="number"
                        min="1"
                        name="case_GPUs_count"
                    />

                    {/* critical_temp of the case */}
                    <ControlledInput
                        data={data} setData={setData} errors={errors}
                        title="Критическая температура"
                        placeholder="В градусах"
                        type="number"
                        min="1"
                        name="case_critical_temp"
                    />
                </>
            );

        default:
            return <span>Такого типа не существует</span>
    }
});
