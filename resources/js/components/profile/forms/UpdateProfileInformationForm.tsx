import {Inertia} from '@inertiajs/inertia';
import {useForm} from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, {useRef, useState} from 'react';
import useRoute from '@hooks/useRoute';
import {IUser} from '@/types/IUser';

import Button from "@components/profile/Button";
import Label from "@components/profile/Label";
import Input from "@components/profile/Input";
import FormSection from "@components/profile/FormSection";
import SecondaryButton from "@components/profile/SecondaryButton";
import InputError from "@components/profile/InputError";
import ActionMessage from "@components/profile/ActionMessage";

interface Props {
    user: IUser;
}

export default React.memo(function UpdateProfileInformationForm({user}: Props) {
    const form = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        photo: null as File | null,
    });
    const route = useRoute();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    // const page = usePage<any>();

    function updateProfileInformation() {
        form.post(route('user-profile-information.update'), {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => clearPhotoFileInput(),
        });
    }

    function selectNewPhoto() {
        photoRef.current?.click();
    }

    function updatePhotoPreview() {
        const photo = photoRef.current?.files?.[0];

        if (!photo) return;

        form.setData('photo', photo);

        const reader = new FileReader();

        reader.onload = e => {
            setPhotoPreview(e.target?.result as string);
        };

        reader.readAsDataURL(photo);
    }

    function deletePhoto() {
        Inertia.delete(route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    }

    function clearPhotoFileInput() {
        if (photoRef.current?.value) {
            photoRef.current.value = '';
            form.setData('photo', null);
        }
    }

    return (
        <FormSection
            onSubmit={updateProfileInformation}
            title={'???????????? ????????????????'}
            description={`???????????????? ???????????? ?????????????? ?? email ??????????.`}
            renderActions={() => (
                <>
                    <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        ??????????????????
                    </ActionMessage>

                    <Button
                        className={classNames({'opacity-25': form.processing})}
                        disabled={form.processing}
                    >
                        ??????????????????
                    </Button>
                </>
            )}
        >
            {/* <!-- Profile Photo --> */}
            <div className="col-span-6 sm:col-span-4">
                {/* <!-- Profile Photo File Input --> */}
                <input
                    type="file"
                    className="hidden"
                    ref={photoRef}
                    onChange={updatePhotoPreview}
                />

                <Label htmlFor="photo" value="????????"/>

                {photoPreview ? (
                    // <!-- New Profile Photo Preview -->
                    <div className="mt-2">
                        <span
                            className="block rounded-full w-20 h-20"
                            style={{
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundImage: `url('${photoPreview}')`,
                            }}
                        />
                    </div>
                ) : (
                    // <!-- Current Profile Photo -->
                    <div className="mt-2">
                        <img
                            src={user.profile_photo_url}
                            alt={user.name}
                            className="rounded-full h-20 w-20 object-cover"
                        />
                    </div>
                )}

                <SecondaryButton
                    className="mt-2 mr-2"
                    type="button"
                    onClick={selectNewPhoto}
                >
                    ?????????????? ????????
                </SecondaryButton>

                {user.profile_photo_path ? (
                    <SecondaryButton
                        type="button"
                        className="mt-2"
                        onClick={deletePhoto}
                    >
                        ?????????????? ????????
                    </SecondaryButton>
                ) : null}

                <InputError message={form.errors.photo} className="mt-2"/>
            </div>

            {/* <!-- Yout ID --> */}
            <div className="col-span-6 sm:col-span-4 flex">
                <Label value="?????? ID:"/>
                <span className="font-medium font-play text-xl">&nbsp;{user.id}</span>
            </div>

            {/* <!-- Name --> */}
            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="name" value="??????"/>
                <Input
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoComplete="name"
                />
                <InputError message={form.errors.name} className="mt-2"/>
            </div>

            {/* <!-- Email --> */}
            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="email" value="??????????"/>
                <Input
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.currentTarget.value)}
                />
                <InputError message={form.errors.email} className="mt-2"/>
            </div>
        </FormSection>
    );
})
