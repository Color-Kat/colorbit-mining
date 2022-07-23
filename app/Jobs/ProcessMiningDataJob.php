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
            if (
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
                * $platform['platform_frequency'] ** 2
                / 100 * 3;;

            /* ----- GPU ----- */
            $GPU = $mData['GPU']['part'];

            // Excel formula
            // = КОРЕНЬ(B4) * КОРЕНЬ(E4) * ЕСЛИ(F4 > 600; LOG(F4); КОРЕНЬ(F4)) * ЕСЛИ(F4<190; 1,1; 1) * ( КОРЕНЬ(H4) * ЕСЛИ(H4 < 5; 1,1; 1) ) / ЕСЛИ(F4 > 600; 140; 1100) * ЕСЛИ(B4<1300;  ЕСЛИ(B4>1000; 1,4; 2 ); 1 )

            // Multiplier by stream processors
            // Reduce speed of increasing hashrate for powerful cards
            // using sqrt and smaller coefficients for powerful cards
            $st_processors_multiplier = sqrt($GPU['GPU_st_processors']);
//                ($GPU['GPU_st_processors'] < 1300
//                    ? ($GPU['GPU_st_processors'] > 1000 ? 1.4 : 2)
//                    : 1
//                );
            if ($GPU['GPU_st_processors'] < 1000)
                $st_processors_multiplier *= 2; // Increase hashrate by st_processors for weak cards
            else if ($GPU['GPU_st_processors'] < 1300)
                $st_processors_multiplier *= 1.4;
            else if ($GPU['GPU_st_processors'] > 10000)
                $st_processors_multiplier *= 0.77; // Decrease hashrate for powerful cards
            else
                $st_processors_multiplier *= 1;

            // Multiplier by bandwidth
            // So reduce speed of increasing hashrate for powerful cards
            // using logarithm and sqrt (for powerful and not cards)
            $VRAM_bandwidth_multiplier =
                ($GPU['GPU_VRAM_bandwidth'] > 600
                    ? log($GPU['GPU_VRAM_bandwidth']) / 250
                    : sqrt($GPU['GPU_VRAM_bandwidth']) / 1100
                ) *
                ($GPU['GPU_VRAM_bandwidth'] < 190 ? 1.1 : 1);

            // Multiplier by vram size
            // Sqrt reduce the different between every next numbers,
            // It make speed of increasing hashrate quick for weak GPUs and slow for powerful GPUs
            $VRAM_size_multiplier =
                sqrt($GPU['GPU_VRAM_size']) *
                ($GPU['GPU_VRAM_size'] < 5
                    ? 1.1
                    : ($GPU['GPU_VRAM_size'] > 10
                        ? 0.7
                        : 1
                    )
                );

            // Calculate the max hash rate
            // by number of stream processors, vram bit, vram bandwidth and vram size
            $GPU_hashrate =
                $st_processors_multiplier *
                sqrt($GPU['GPU_VRAM_bit']) *
                $VRAM_bandwidth_multiplier *
                $VRAM_size_multiplier;

            // Loading algorithm for CPU - =1/КОРЕНЬ(КОРЕНЬ(A2)) * $I$5 ^ (1/6) * 225
            // Calculate loading by gpu hashrate and platform performance.
            $GPU_loading_by_CPU =
                1 / pow($GPU_hashrate, 1 / 4) *
                pow($platform_performance, 1 / 6) *
                225;

            // Change hashrate by GPU loading
            $GPU_hashrate *= ($GPU_loading_by_CPU > 100 ? 100 : $GPU_loading_by_CPU) / 100;

            // Calculate CPU loading (platform)
            if($GPU_loading_by_CPU - 100 <= 0) $CPU_loading = 100;
            else $CPU_loading = 100 - ($GPU_loading_by_CPU - 100);

            // Change hashrate by GPU loading
            $GPU_hashrate *= ($GPU_loading_by_CPU > 100 ? 100 : $GPU_loading_by_CPU) / 100;

            Log::info($mData['name']);
            Log::info('Hashrate: ' . $GPU_hashrate);
            Log::info('GPU Loading: ' . $GPU_loading_by_CPU . '%');
            Log::info('CPU Loading: ' . $CPU_loading . '%');
        }

        ApplyMiningDataJob::dispatch();

        Log::info($this->miningData);
    }
}
