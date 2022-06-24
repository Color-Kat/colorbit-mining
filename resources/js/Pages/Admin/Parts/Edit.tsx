import React, {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import useRoute from "@hooks/useRoute";

import {IPage} from "@/types/IPage";
import {PartT} from "@/types/parts/PartT";
import {IBasePart, PartType} from "@/types/parts/IBasePart";

import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import {FourthStage} from "@components/admin/stages/FourthStage";
import {FirstStage} from "@components/admin/stages/FirstStage";
import {SecondStage} from "@components/admin/stages/SecondStage";
import {ThirdStage} from "@components/admin/stages/ThirdStage";
import {StageControl} from "@components/admin/stages/StageControll";
import useTypedPage from "@hooks/useTypedPage";
import {Part} from "@/classes/Part";
import {Inertia} from "@inertiajs/inertia";

const AdminPartEdit: IPage = React.memo(() => {
    const route = useRoute();
    const part = useTypedPage<{ part: PartT<PartType> }>().props.part;

    let {data, setData, put, processing, errors} =
        useForm<(PartT<PartType> | IBasePart) & { _image?: File | null }>(Part.createByType(part));

    let imageData = useForm<{image: File | null}>({
        image: null
    });

    const [stage, setStage] = useState<number>(1);

    const updatePart = () => {
        if (stage === 4) {
            // Move image file
            // because patch method doesn't support upload images
            // const imageFile = data._image ?? null;


            // if(imageFile) {
            //     imageData.setData('image', imageFile);
            //     setData('_image', null); // Remove from main query
            //
            //     console.log(imageData.data)
            //     // Update image query
            //     imageData.post(route('admin.parts.update-image', part.id));
            // }
            //
            // setTimeout(()=>{
            //
            //
            //     // Update part
            //     // put(route('admin.parts.update', part.id));
            // }, 500)

            Inertia.post(route('admin.parts.update', part.id), {
                _method: 'patch',
                ...data as any
            })
        }
    }

    useEffect(updatePart, [stage]);

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
                <SecondStage data={data} setData={setData} errors={errors}/>
            </div>}

            {/* STAGE 3 */}
            {stage == 3 && <div className="space-y-4">
                <ThirdStage data={data} setData={setData} errors={errors}/>
            </div>}

            {/* STAGE 4 - RESULT */}
            {stage == 4 && <div className="space-y-4">
                <FourthStage processing={processing} errors={errors}/>
            </div>}

            {/* STAGES CONTROL */}
            <StageControl stage={stage} setStage={setStage} errors={errors}/>

        </AdminPartsListLayout>
    );
});


export default AdminPartEdit;
