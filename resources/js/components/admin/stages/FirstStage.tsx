import React, {ReactNode} from "react";
import {ControlledSelect} from "../../elements/form/ControlledSelect";
import {ControlledInput} from "../../elements/form/ControlledInput";
import {PhotoInput} from "../../elements/form/PhotoInput";

const typesList = [
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
]

export const FirstStage: React.FC<{
    data: any,
    setData: (name: string, data: any) => void,
    errors: any
}>
    = ({data, setData, errors}) => {

    return (
        <>
            <PhotoInput data={data} setData={setData} errors={errors}/>

            {/* NAME */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Название"
                name="name"
            />

            {/* VENDOR */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Вендор"
                name="vendor"
            />

            {/* SLUG */}
            <ControlledInput
                data={data} setData={setData} errors={errors}
                title="Идентификатор"
                name="slug"
            />

            <ControlledSelect
                data={data} setData={setData}
                name="type"
                title="Тип"
                options={typesList}
            />
        </>
    );
}
