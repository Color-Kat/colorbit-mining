<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMiningDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $miningData = [];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $miningData)
    {
        $this->miningData = $miningData;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $applyMiningData = [];

        foreach ($this->miningData as $mData) {
            if(
                !$mData['GPU'] ||
                !$mData['platform'] ||
                !$mData['RAM'] ||
                !$mData['PSU'] ||
                !$mData['case']
            ) continue;
//            Log::info( $mData['GPU']);

            /* ----- Platform ----- */
            $platform = $mData['platform']['part'];
            $platform_performance =
                ($platform['platform_cors_count'] + $platform['platform_threads_count'])
                * $platform['platform_frequency']
                / 100 * 4;
            ;

            /* ----- GPU ----- */
            $GPU = $mData['GPU']['part'];

            $GPU_VRAM_coefficient = 0.5;
            if($GPU['GPU_VRAM_type'] === 'GDDR4') $GPU_VRAM_coefficient = 2;
            if($GPU['GPU_VRAM_type'] === 'GDDR5') $GPU_VRAM_coefficient = 8;
            if($GPU['GPU_VRAM_type'] === 'GDDR5x') $GPU_VRAM_coefficient = 12;
            if($GPU['GPU_VRAM_type'] === 'GDDR6') $GPU_VRAM_coefficient = 16;
            if($GPU['GPU_VRAM_type'] === 'GDDR6x') $GPU_VRAM_coefficient = 24;

            // = КОРЕНЬ(B4) * КОРЕНЬ(E4) * ЕСЛИ(F4 > 600; LOG(F4); КОРЕНЬ(F4)) * ЕСЛИ(F4<190; 1,1; 1) * ( КОРЕНЬ(H4) * ЕСЛИ(H4 < 5; 1,1; 1) ) / ЕСЛИ(F4 > 600; 140; 1100) * ЕСЛИ(B4<1300;  ЕСЛИ(B4>1000; 1,4; 2 ); 1 )

            $GPU_performance_coefficient = 24.53421747;
            $GPU_performance =
                $GPU['GPU_VRAM_size'] ** 2 *
                $GPU_VRAM_coefficient ** (0.6) *
                $GPU['GPU_chip_frequency'] ** (0.1)
                / 1000 * 3 * $GPU_performance_coefficient;

//            $GPU_loading_coefficient = $platform_performance * $GPU_performance + 25;
//            $GPU_loading = ($GPU_loading_coefficient < 100 ? $GPU_loading_coefficient : 100);
//            $GPU_performance *= $GPU_loading/100;

            Log::info($mData['name']);
//            Log::info($GPU_loading);
            Log::info($GPU_performance);
            Log::info($platform_performance);
        }

        ApplyMiningDataJob::dispatch();

        Log::info($this->miningData);
    }
}
