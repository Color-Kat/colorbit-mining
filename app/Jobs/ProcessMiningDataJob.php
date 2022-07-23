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
    public $GPU = null;
    public $CPU = null;
    public $RAM = null;
    public $PSU = null;
    public $case = null;

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
     * Calculate performance of CPU (platform)
     * It depends on cors and threads count and frequency of CPU^2
     *
     * @param $CPU
     * @return float|int
     */
    private function calculate_CPU_performance($CPU)
    {
        $CPU_performance =
            ($CPU['platform_cors_count'] + $CPU['platform_threads_count'])
            * $CPU['platform_frequency'] ** 2
            / 100 * 3;;

        return $CPU_performance;
    }

    /**
     * Calculate the coefficient of influence of RAM on the hashrate
     * The smaller the performance of memory, the smaller hashrate. But it doesn't affect that much
     *
     * @param $CPU
     * @return float|int
     */
    private function calculate_RAM_coefficient($RAM)
    {
        $RAM_coefficient =
            sqrt(sqrt(sqrt(32))) *
            sqrt(sqrt(2666)) *
            ($RAM['RAM_channels'] > 1 ? 1.14 : 1.1)
            / 10;

        if ($RAM_coefficient > 1) $RAM_coefficient = 1;

        return $RAM_coefficient;
    }

    /**
     * Calculate the maximum hashrate of GPU
     *
     * @param $CPU
     * @return float|int
     */
    private function calculate_GPU_hashrate($GPU)
    {
        // Excel formula
        // = КОРЕНЬ(B4) * КОРЕНЬ(E4) * ЕСЛИ(F4 > 600; LOG(F4); КОРЕНЬ(F4)) * ЕСЛИ(F4<190; 1,1; 1) * ( КОРЕНЬ(H4) * ЕСЛИ(H4 < 5; 1,1; 1) ) / ЕСЛИ(F4 > 600; 140; 1100) * ЕСЛИ(B4<1300;  ЕСЛИ(B4>1000; 1,4; 2 ); 1 )

        // Multiplier by stream processors
        // Reduce speed of increasing hashrate for powerful cards
        // using sqrt and smaller coefficients for powerful cards
        $st_processors_multiplier = sqrt($GPU['GPU_st_processors']);

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

        return $GPU_hashrate;
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

            /* ----- CPU ----- */
            $CPU_performance = $this->calculate_CPU_performance($mData['platform']['part']);

            /* ----- RAM ----- */
            $RAM_coefficient = $this->calculate_RAM_coefficient($mData['RAM']['part']);

            /* ----- GPU ----- */
            $GPU_hashrate = $this->calculate_GPU_hashrate($mData['GPU']['part']);

            // Calculate loading by gpu hashrate and platform performance. In %
            $GPU_loading_by_CPU =
                1 / pow($GPU_hashrate, 1 / 4) *
                pow($CPU_performance, 1 / 6) *
                225 / 100;

            // Apply GPU loading to change hashrate by CPU loading (in shares - 0-1)
            $GPU_hashrate *=
                ($GPU_loading_by_CPU > 1 ? 1 : $GPU_loading_by_CPU) *
                $RAM_coefficient
            ;

            // Calculate CPU loading
            if ($GPU_loading_by_CPU - 1 <= 0) {
                $CPU_loading = 1;
            } else {
                $CPU_loading = 1 - ($GPU_loading_by_CPU - 1);
            }

            Log::info($mData['name']);
            Log::info('Hashrate: ' . $GPU_hashrate);
            Log::info('GPU Loading: ' . $GPU_loading_by_CPU . '%');
            Log::info("CPU Loading ({$mData['platform']['part']['name']}): " . $CPU_loading . '%');
            Log::info("RAM Loading ({$mData['RAM']['part']['name']}): " . $RAM_coefficient . '%');
        }

        ApplyMiningDataJob::dispatch();

        Log::info($this->miningData);
    }
}
