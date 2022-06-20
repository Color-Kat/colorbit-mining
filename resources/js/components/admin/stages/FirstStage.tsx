import React, {useEffect} from "react";
import {ControlledSelect} from "../../elements/form/ControlledSelect";
import {ControlledInput} from "../../elements/form/ControlledInput";
import {PhotoInput} from "../../elements/form/PhotoInput";
import {Case, GPU, Platform, PSU, RAM} from "../../../classes/Part";
import {IBasePart} from "../../../types/parts/IBasePart";

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
        setData(name, value)

        setData((prev: IBasePart) => {
            switch (value){
                case 'GPU': return new GPU(prev);
                case 'platform': return new Platform(prev);
                case 'RAM': return new RAM(prev);
                case 'PSU': return new PSU(prev);
                case 'case': return new Case(prev);
            }
        });

    }

    return (
        <>
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
                placeholder="msi-gtx-1050ti"
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
