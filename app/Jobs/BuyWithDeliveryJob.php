<?php

namespace App\Jobs;

use App\Models\Having;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class BuyWithDeliveryJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var User Model
     */
    protected User $user;

    /**
     * @var int id of part_shop table, pivot for shop and part
     */
    protected int $part_shop_id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $part_shop_id)
    {
        $this->user = $user;
        $this->part_shop_id = $part_shop_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Create new Having for user
        $having = new Having();
        $having->part_shop_id = $this->part_shop_id;
        $having->user_id = $this->user->id;
        $this->user->havings()->save($having);
    }
}
