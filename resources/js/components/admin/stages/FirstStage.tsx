import React, {useEffect} from "react";
import {ControlledSelect} from "../../elements/form/ControlledSelect";
import {ControlledInput} from "../../elements/form/ControlledInput";
import {PhotoInput} from "../../elements/form/PhotoInput";
import {Case, GPU, Platform, PSU, RAM} from "@/classes/Part";
import {IPart} from "@/types/parts/IPart";
import {PartT} from "../../../types/parts/PartT";
import {Part} from "../../../classes/Part";
import {PartType} from "../../../types/parts/IBasePart";

const type_options = [
    {
        title: 'Видеокарта',
        value: 'GPU'
    },
    {
        title: 'Платформа',
        value: 'platform'
    },
    {
        title: 'ОЗУ',
        value: 'RAM'
    },
    {
        title: 'Блок Питания',
        value: 'PSU'
    },
    {
        title: 'Каркас',
        value: 'case'
    }
];

export const FirstStage: React.FC<{
    data: any,
    setData: ((name: string, data: any) => void) & ((prev: any) => any),
    errors: any
}>
    = ({data, setData, errors}) => {

    useEffect(() => {
        typeChangeHandler('type', data.type);
    }, []);

    // Update available fields (for GPU, RAM,..)
    const typeChangeHandler = (name: string, value: any) => {
        setData(name, value); // Update type

        // Fill properties for new type
        setData((prev: IPart) => {
            return Part.createByType(prev as PartT<PartType>);
        });
    }

    return (
        <>
            {/* Image */}
            <PhotoInput data={data} setData={setData} errors={errors}/>

            {/* NAME */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Название"
                placeholder="GTX 1050Ti"
                name="name"
            />

            {/* VENDOR */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Вендор"
                placeholder="MSI"
                name="vendor"
            />

            {/* SLUG */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Идентификатор"
                placeholder="Генерируется автоматически"
                name="slug"
            />

            {/* TYPE */}
            <ControlledSelect
                data={data} setData={typeChangeHandler}
                name="type"
                title="Тип"
                options={type_options}
            />
        </>
    );
}
