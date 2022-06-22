<?php

namespace App\traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasImage
{
    /**
     * Update the image.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateImage(UploadedFile $photo, $field, $folder)
    {
        tap($this[$field], function ($previous) use ($photo, $field, $folder) {
            $this->forceFill([
                $field => $photo->storePublicly(
                    $folder, ['disk' => $this->ImageDisk()]
                ),
            ])->update();

            if ($previous) {
                Storage::disk($this->ImageDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the image.
     *
     * @return void
     */
    public function deleteProfilePhoto(string $field = 'image')
    {
        if (is_null($this->profile_photo_path)) {
            return;
        }

        Storage::disk($this->profilePhotoDisk())->delete($this->profile_photo_path);

        $this->forceFill([
            $field => null,
        ])->save();
    }

    /**
     * Get the URL to the image.
     *
     * @return string
     */
    public function getImageUrlAttribute()
    {
        return $this->profile_photo_path
            ? Storage::disk($this->ImageDisk())->url($this->profile_photo_path)
            : $this->defaultProfilePhotoUrl();
    }

    /**
     * Get the disk that image should be stored on.
     *
     * @return string
     */
    protected function ImageDisk()
    {
        return 'public';
    }
}

