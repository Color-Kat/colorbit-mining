import React, {useRef, useState} from 'react';
import Label from "./Label";
import SecondaryButton from "../SecondaryButton";
import InputError from "./InputError";
import useRoute from "@hooks/useRoute";

import noImage from '@assets/no-image/part.png';
import {Inertia} from "@inertiajs/inertia";

interface PhotoInputProps {
    data: {
        name?: string
        image: string,
        _image?: File | null
    };
    setData: (name: string, data: any) => void;
    errors: {image: string};
    destroyRoute?: string;
}

export const PhotoInput: React.FC<PhotoInputProps> = React.memo(({data, setData, errors, destroyRoute}) => {
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
        if(!destroyRoute) return;

        Inertia.delete(destroyRoute, {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    }

    function clearPhotoFileInput() {
        setData('image', null);

        if (photoRef.current?.value) {
            photoRef.current.value = '';
            setData('_image', null);
        }
    }

    return (
        <div className="photo-upload">
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
                        alt="Фото товара"
                        className="w-full xsm:w-60 object-cover"
                    />
                </div>
            ) : (
                // <!-- Current Image -->
                <div className="mt-2">
                    <img
                        src={data.image ? data.image : noImage}
                        alt="Фото товара"
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
}, (prev, next) => {
    return prev.data._image === next.data._image || prev.data.image === next.data.image;
});
