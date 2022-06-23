<?php

namespace App\traits;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasImage
{
    protected $imageField = 'image';

    /**
     * Update the image.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateImage(UploadedFile $photo, $folder)
    {
        tap($this[$this->imageField], function ($previous) use ($photo, $folder) {
            $this->forceFill([
                $this->imageField => $photo->storePublicly(
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
    public function deleteProfilePhoto()
    {
        if (is_null($this->image)) {
            return;
        }

        Storage::disk($this->profilePhotoDisk())->delete($this->image);

        $this->forceFill([
            $this->imageField => null,
        ])->save();
    }

    /**
     * Return full url for image
     *
     * @return  \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: function ($value, $attributes) {
//                dump($value, $attributes);
                return $value
                    ? Storage::disk($this->ImageDisk())->url($value)
                    : Storage::disk($this->ImageDisk())->url($this->defaultImageUrl());
            }
        );
    }

   public function defaultImageUrl(){
        return 'default-images/no-image.png';
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

