import React, {useRef, useState} from 'react';
import Label from "./Label";
import SecondaryButton from "../SecondaryButton";
import InputError from "./InputError";
import useRoute from "@hooks/useRoute";

import noImage from '@assets/no-image/part.png';

interface PhotoInputProps {
    data: {
        name?: string
        image: string,
        _image: File | null
    };
    setData: (name: string, data: any) => void;
    errors: {image: string}
}

export const PhotoInput: React.FC<PhotoInputProps> = React.memo(({data, setData, errors}) => {
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
                        src={data.image ? data.image : noImage}
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
