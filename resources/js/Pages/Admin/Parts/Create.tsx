import React, {useRef, useState} from "react";
import {IPage} from "@/types/IPage";
import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import Label from "../../../components/elements/form/Label";
import SecondaryButton from "../../../components/elements/SecondaryButton";
import InputError from "../../../components/elements/form/InputError";
import Input from "../../../components/elements/form/Input";
import {Inertia} from "@inertiajs/inertia";
import {InertiaFormProps, useForm} from "@inertiajs/inertia-react";
import useRoute from "@hooks/useRoute";
import {PhotoInput} from "../../../components/elements/form/PhotoInput";


const AdminInput: React.FC = React.memo(() => {
    return (
        <span>123</span>
    );
});

const AdminPartCreate: IPage = React.memo(() => {
    const route = useRoute();
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        image: '',
        _image: null as File | null,
    });

    const createPart = () => {
        console.log('update', data);
    }

    // const page = usePage<any>();

    // function updateProfileInformation() {
    //     post(route('user-profile-information.update'), {
    //         errorBag: 'updateProfileInformation',
    //         preserveScroll: true,
    //         onSuccess: () => clearPhotoFileInput(),
    //     });
    // }



    return (
        <AdminPartsListLayout title="Редактирование" description="Изменяйте свойства комплектующих здесь">

            <PhotoInput data={data} setData={setData} errors={errors}/>

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

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
