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
            // Delete previous image
            $prevImage = $this->getRawOriginal($this->imageField);
            if ($prevImage) {
                Storage::disk($this->ImageDisk())->delete($prevImage);
            }

            // Create new image
            $this->forceFill([
                $this->imageField => $photo->storePublicly(
                    $folder, ['disk' => $this->ImageDisk()]
                ),
            ])->update();
        });
    }

    /**
     * Delete the image.
     *
     * @return void
     */
    public function deleteImage()
    {
        if (is_null($this[$this->imageField])) {
            return;
        }

        // Delete image from the storage
        Storage::disk($this->ImageDisk())->delete($this->getRawOriginal($this->imageField) ?? '');

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
            get: function ($value) {
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

