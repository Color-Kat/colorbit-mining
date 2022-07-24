<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MiningBreakdownsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private array $pData = [];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($processedData)
    {
        $this->pData = $processedData;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {


        ApplyMiningDataJob::dispatch();
    }
}
