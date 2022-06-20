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

                <ControlledInput
                    data={data} setData={setData} errors={errors}
                    title="Название"
                    name="name"
                />

                <ControlledInput
                    data={data} setData={setData} errors={errors}
                    title="Вендор"
                    name="vendor"
                />

                {/* <!-- Name --> */}
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value="Имя"/>
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={e => setData('name', e.currentTarget.value)}
                        autoComplete="name"
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </div>
            </div>

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
