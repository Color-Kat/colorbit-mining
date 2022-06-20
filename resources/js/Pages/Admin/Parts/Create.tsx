import React from "react";
import {IPage} from "@/types/IPage";
import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import Label from "@components/elements/form/Label";
import InputError from "@components/elements/form/InputError";
import Input from "@components/elements/form/Input";
import {useForm} from "@inertiajs/inertia-react";
import useRoute from "@hooks/useRoute";
import {PhotoInput} from "@components/elements/form/PhotoInput";
import {PartT} from "@/types/parts/IPart";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import {Part} from "@/classes/Part";
import {ControlledInput} from "../../../components/elements/form/ControlledInput";

const AdminPartCreate: IPage = React.memo(() => {
    const route = useRoute();
    let {data, setData, post, processing, errors} = useForm<PartT<PartType> | IBasePart>(new Part());



    const createPart = () => {
        console.log('update', data);

        // post(route('user-profile-information.update'), {
        //         errorBag: 'updateProfileInformation',
        //         preserveScroll: true,
        //         onSuccess: () => clearPhotoFileInput(),
        //     });
    }

    return (
        <AdminPartsListLayout
            title="Редактирование"
            description="Изменяйте свойства комплектующих здесь"
        >

            <div className="space-y-4">
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

                {/* Price */}
                <ControlledInput
                    data={data} setData={setData} errors={errors}
                    title="Цена"
                    name="price"
                />

            </div>

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
