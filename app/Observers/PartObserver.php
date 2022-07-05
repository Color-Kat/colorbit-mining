<?php

namespace App\Observers;

use App\Models\Part;

class PartObserver
{
    /**
     * Handle the Part "created" event.
     *
     * @param  \App\Models\Part  $part
     * @return void
     */
    public function created(Part $part)
    {
        //
    }

    /**
     * Handle the Part "updated" event.
     *
     * @param  \App\Models\Part  $part
     * @return void
     */
    public function updated(Part $part)
    {
        //
    }

    /**
     * Handle the Part "deleted" event.
     *
     * @param  \App\Models\Part  $part
     * @return void
     */
    public function deleted(Part $part)
    {
        //
    }

    /**
     * Handle the Part "restored" event.
     *
     * @param  \App\Models\Part  $part
     * @return void
     */
    public function restored(Part $part)
    {
        //
    }

    /**
     * Handle the Part "force deleted" event.
     *
     * @param  \App\Models\Part  $part
     * @return void
     */
    public function forceDeleted(Part $part)
    {
        $part->deleteImage();
    }
}
