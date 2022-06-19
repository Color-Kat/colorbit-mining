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

import noImage from '@assets/no-image/part.png';

const AdminInput: React.FC = React.memo(() => {
    return (
        <span>123</span>
    );
});

interface PhotoInputProps {
    data: {
        name?: string
        image: string,
        _image: File | null
    };
    setData: (name: string, data: any) => void;
    errors: {image: string}
}

const PhotoInput: React.FC<PhotoInputProps> = (({data, setData, errors}) => {
    const route = useRoute();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);

    function selectNewPhoto() {
        photoRef.current?.click();
    }

    function updatePhotoPreview() {
        const image = photoRef.current?.files?.[0];

        if (!image) return;

        setData('_image', image);

        const reader = new FileReader();

        reader.onload = e => {
            setPhotoPreview(e.target?.result as string);
        };

        reader.readAsDataURL(image);
    }

    function deletePhoto() {
        // Inertia.delete(route('current-user-photo.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            // },
        // });
    }

    function clearPhotoFileInput() {
        setData('image', null);

        if (photoRef.current?.value) {
            photoRef.current.value = '';
            setData('_image', null);
        }
    }

    return (
        <div className="col-span-6 sm:col-span-4">
            {/* <!-- Part Image File Input --> */}
            <input
                type="file"
                className="hidden"
                ref={photoRef}
                onChange={updatePhotoPreview}
            />

            <Label htmlFor="photo" value="Фото"/>

            {photoPreview ? (
                // <!-- New Image Preview -->
                <div className="mt-2">
                    <img
                        src={photoPreview}
                        alt={data.name}
                        className="w-full xsm:w-60 object-cover"
                    />
                </div>
            ) : (
                // <!-- Current Image -->
                <div className="mt-2">
                    <img
                        src={data.image ?? noImage}
                        alt={data.name}
                        className="w-full xsm:w-60 object-cover"
                    />
                </div>
            )}

            <SecondaryButton
                className="mt-2 mr-2"
                type="button"
                onClick={selectNewPhoto}
            >
                Выбрать фото
            </SecondaryButton>

            {data.image ? (
                <SecondaryButton
                    type="button"
                    className="mt-2"
                    onClick={deletePhoto}
                >
                    Удалить фото
                </SecondaryButton>
            ) : null}

            <InputError message={errors.image} className="mt-2"/>
        </div>
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
