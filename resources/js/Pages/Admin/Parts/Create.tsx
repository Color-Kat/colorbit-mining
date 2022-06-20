import React, {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import useRoute from "@hooks/useRoute";

import {IPage} from "@/types/IPage";
import {PartT} from "@/types/parts/IPart";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import {Part} from "@/classes/Part";

import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import {PhotoInput} from "@components/elements/form/PhotoInput";
import {ControlledInput} from "@components/elements/form/ControlledInput";


import Label from "@components/elements/form/Label";
import Input from "@components/elements/form/Input";
import InputError from "@components/elements/form/InputError";
import Button from "../../../components/elements/Button";
import SecondaryButton from "../../../components/elements/SecondaryButton";

interface ControlledSelectProps {
    name: string;
    title: string;
    options: {
        title: string,
        value: string,
        selected?: boolean
    }[]
}

const ControlledSelect: React.FC<ControlledSelectProps> = ({name, title, options}) => {
    return (
        <div className="control-select">
            <Label htmlFor={name} value={title}/>

            <select name={name}>
                {options.map((option, i) => (
                    <option
                        selected={option.selected}
                        value={option.value}
                    >{option.title}</option>
                ))}
            </select>

            {/*<Input*/}
            {/*    id={name}*/}
            {/*    type={type}*/}
            {/*    className="mt-1 block w-full"*/}
            {/*    value={data[name]}*/}
            {/*    onChange={e => setData(name, e.currentTarget.value)}*/}
            {/*/>*/}
        </div>
    );
}

const AdminPartCreate: IPage = React.memo(() => {
    const route = useRoute();
    let {data, setData, post, processing, errors} = useForm<PartT<PartType> | IBasePart>(new Part());

    const [stage, setStage] = useState<number>(1);

    const nextStage = () => {
        setStage(prev => {
            if (prev < 3) return prev + 1;
            else return prev;
        })
    }

    const prevStage = () => {
        setStage(prev => {
            if (prev > 1) return prev - 1;
            else return prev;
        })
    }

    const createPart = () => {
        console.log('update', data);

        // post(route('user-profile-information.update'), {
        //     errorBag: 'updateProfileInformation',
        //     preserveScroll: true,
        //     onSuccess: () => clearPhotoFileInput(),
        // });
    }

    return (
        <AdminPartsListLayout
            title="Редактирование"
            description="Изменяйте свойства комплектующих здесь"
        >

            {/* STAGE 1 */}
            {/* Use CSS hidden/visible to save PhotoInput state */}
            <div className={`space-y-4 ${stage == 1 ? 'visible' : 'hidden'}`}>
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
            </div>


            {/* STAGE 2 */}
            {stage == 2 && <div className="space-y-4">

            </div>}


            {/* STAGE 3 */}
            {stage == 3 && <div className="space-y-4">


                {/* Price */}
                <ControlledInput
                    data={data} setData={setData} errors={errors}
                    title="Цена"
                    name="price"
                />
            </div>}


            {/* STAGES CONTROL */}
            <div className="admin-stages w-full flex justify-between mt-7">
                {stage > 1
                    ? <SecondaryButton onClick={prevStage} className="h-9 sm:text-base font-medium xsm:px-6">
                        Назад
                    </SecondaryButton>
                    : <div/>
                }

                <Button onClick={nextStage} className="h-9 sm:text-base font-medium xsm:px-6">
                    Далее
                </Button>
            </div>

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
