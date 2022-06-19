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

interface AdminInputProps {
    title: string;
    name: string;
    type?: string;
    data: {
        [key: string]: any
    };
    setData: (name: string, data: any) => void;
    errors: { [key: string]: string };
}

const ControlInput: React.FC<AdminInputProps> = React.memo(({
                                                                name,
                                                                title,
                                                                type = 'text',
                                                                data,
                                                                setData,
                                                                errors
                                                            }) => {
    console.log('input')

    return (
        <div className="control-input">
            <Label htmlFor={name} value={title}/>
            <Input
                id={name}
                type={type}
                className="mt-1 block w-full"
                value={data[name]}
                onChange={e => setData(name, e.currentTarget.value)}
            />
            <InputError message={errors[name]} className="mt-2"/>
        </div>
    );
});

const AdminPartCreate: IPage = React.memo(() => {
    const route = useRoute();
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        vendor: '',
        email: '',
        image: '',
        _image: null as File | null,
    });

    console.log('parent')

    const createPart = () => {
        console.log('update', data);

        // post(route('user-profile-information.update'), {
        //         errorBag: 'updateProfileInformation',
        //         preserveScroll: true,
        //         onSuccess: () => clearPhotoFileInput(),
        //     });
    }

    // const page = usePage<any>();

    return (
        <AdminPartsListLayout
            title="Редактирование"
            description="Изменяйте свойства комплектующих здесь"
        >

            <div className="space-y-4">
                <PhotoInput data={data} setData={setData} errors={errors}/>

                <ControlInput
                    data={data} setData={setData} errors={errors}
                    title="Название"
                    name="name"
                />

                <ControlInput
                    data={data} setData={setData} errors={errors}
                    title="Название"
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
