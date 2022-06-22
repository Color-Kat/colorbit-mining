import React, {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";

import {IPage} from "@/types/IPage";
import {PartT} from "@/types/parts/PartT";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import {Part} from "@/classes/Part";

import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";

import {FirstStage} from "@components/admin/stages/FirstStage";
import {SecondStage} from "@components/admin/stages/SecondStage";
import {ThirdStage} from "@components/admin/stages/ThirdStage";

import useRoute from "@hooks/useRoute";
import {StageControl} from "@components/admin/stages/StageControll";

const AdminPartCreate: IPage = React.memo(() => {
    const route = useRoute();
    let {data, setData, post, processing, errors} = useForm<PartT<PartType> | IBasePart>(new Part({
        name: 'gtx 1050',
        vendor: 'msi',
        breakdowns: [],
        slug: '',
        shops: [],
        image: '123',
        type: 'PSU',
        price: 100
    }));

    const [stage, setStage] = useState<number>(1);

    const createPart = () => {
        if(stage === 4) {
            console.log('create', data);

            post(route('admin.parts.store'), {
                preserveScroll: true,

            });
        }
    }

    useEffect(createPart, [stage])

    // @ts-ignore
    // @ts-ignore
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
                <ThirdStage data={data} setData={setData} errors={errors} />
            </div>}

            {/* STAGE 4 - RESULT */}
            {stage == 4 && <div className="space-y-4">
                {processing
                    ? 'Загрузка'
                    : (Object.keys(errors).length ? (errors as any)[Object.keys(errors)[0]] : 'Отлично!')
                }
            </div>}

            {/* STAGES CONTROL */}
            <StageControl stage={stage} setStage={setStage}/>

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
