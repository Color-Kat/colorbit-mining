import React, {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";

import {IPage} from "@/types/IPage";
import {PartT} from "@/types/parts/IPart";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import {Part} from "@/classes/Part";

import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import {PhotoInput} from "@components/elements/form/PhotoInput";
import {ControlledInput} from "@components/elements/form/ControlledInput";


import Button from "../../../components/elements/Button";
import SecondaryButton from "../../../components/elements/SecondaryButton";
import {ControlledSelect} from "../../../components/elements/form/ControlledSelect";
import {FirstStage} from "../../../components/admin/stages/FirstStage";
import {SecondStage} from "../../../components/admin/stages/SecondStage";



const AdminPartCreate: IPage = React.memo(() => {
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

                <FirstStage data={data} setData={setData} errors={errors}/>

            </div>


            {/* STAGE 2 */}
            {stage == 2 && <div className="space-y-4">
                <SecondStage data={data} setData={setData} errors={errors} />
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

                <Button
                    onClick={nextStage}
                    className="h-9 sm:text-base font-medium xsm:px-6"
                >
                    Далее
                </Button>
            </div>

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
