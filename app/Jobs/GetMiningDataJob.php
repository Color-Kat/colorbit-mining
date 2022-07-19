<?php

namespace App\Jobs;

use App\Models\Rig;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GetMiningDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $miningData = Rig::
            where('state', 'on')
            ->with(
                'GPU',
                'platform',
                'RAM',
                'PSU',
                'case'
            )
            ->get()
            ->toArray();

        ProcessMiningDataJob::dispatch($miningData);
    }
}
