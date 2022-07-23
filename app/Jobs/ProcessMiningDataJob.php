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

            /* ----- Platform ----- */
            $platform = $mData['platform']['part'];
            $platform_performance =
                ($platform['platform_cors_count'] + $platform['platform_threads_count'])
                * $platform['platform_frequency']
                / 100 * 4;
            ;

            /* ----- GPU ----- */
            $GPU = $mData['GPU']['part'];

            // Excel formula
            // = КОРЕНЬ(B4) * КОРЕНЬ(E4) * ЕСЛИ(F4 > 600; LOG(F4); КОРЕНЬ(F4)) * ЕСЛИ(F4<190; 1,1; 1) * ( КОРЕНЬ(H4) * ЕСЛИ(H4 < 5; 1,1; 1) ) / ЕСЛИ(F4 > 600; 140; 1100) * ЕСЛИ(B4<1300;  ЕСЛИ(B4>1000; 1,4; 2 ); 1 )

            // Multiplier by stream processors
            $st_processors_multiplier =
                sqrt($GPU['GPU_st_processors']) *
                ($GPU['GPU_st_processors'] < 1300
                    ? ($GPU['GPU_st_processors'] > 1000 ? 1.4 : 2)
                    : 1
                );

            // Multiplier by bandwidth
            $VRAM_bandwidth_multiplier =
                ($GPU['GPU_VRAM_bandwidth'] > 600
                    ? log($GPU['GPU_VRAM_bandwidth']) / 250
                    : sqrt($GPU['GPU_VRAM_bandwidth']) / 1100
                ) *
                ($GPU['GPU_VRAM_bandwidth'] < 190 ? 1.1 : 1);

            // Multiplier by vram size
            $VRAM_size_multiplier =
                sqrt($GPU['GPU_VRAM_size']) *
                ($GPU['GPU_VRAM_size'] < 5 ? 1.1 : 1);

            // Calculate hash rate
            $GPU_performance =
                $st_processors_multiplier *
                sqrt($GPU['GPU_VRAM_bit']) *
                $VRAM_bandwidth_multiplier *
                $VRAM_size_multiplier
            ;

            // Loading algorithm - =1/КОРЕНЬ(КОРЕНЬ(A2)) * $I$5 ^ (1/6) * 225
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
