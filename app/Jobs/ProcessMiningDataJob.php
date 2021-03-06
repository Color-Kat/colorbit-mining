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
     * Calculate the performance of RAM.
     * The smaller the performance of memory, the smaller hashrate. But it doesn't affect that much.
     *
     * @param $CPU
     * @return float|int
     */
    private function calculate_RAM_preformance($RAM)
    {
        // E9^(1/3)*КОРЕНЬ(F9*G9/2)/60
        $RAM_performance =
            pow($RAM['RAM_size'], 1 / 3) *
            sqrt($RAM['RAM_frequency'] * $RAM['RAM_channels'] / 2)
            / 60;

        return $RAM_performance;
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
     * Calculate loadings of GPU, CPU, RAM
     *
     * @param int|float $GPU_hashrate
     * @param int|float $CPU_performance
     * @param int|float $RAM_performance
     * @param array $mData
     * @return array
     */
    private function calculateLoadings(
        int|float $GPU_hashrate,
        int|float $CPU_performance,
        int|float $RAM_performance,
        array $mData
    ) {
        $loadings = [];

        // Calculate loading of GPU by GPU hashrate and platform performance. In %
        $GPU_loading_by_CPU =
            1 / pow($GPU_hashrate, 1 / 4) *
            pow($CPU_performance, 1 / 6) *
            225 / 100;

        // Calculate loading of GPU by GPU hashrate and RAM performance. In %
        $GPU_loading_by_RAM =
            1 / pow($GPU_hashrate, 1 / 4) *
            pow($RAM_performance, 1 / 4) *
            290 / 100;

        // Calculate GPU loading by CPU and RAM loadings
        $GPU_loading =
            1 *
            ($GPU_loading_by_CPU > 1 ? 1 : $GPU_loading_by_CPU) *
            ($GPU_loading_by_RAM > 1 ? 1 : $GPU_loading_by_RAM);

        // The max loading is 100%
        if ($GPU_loading > 1) $GPU_loading = 1;

        // Calculate CPU loading
        if ($GPU_loading_by_CPU - 1 <= 0) {
            $CPU_loading = 1;
        } else {
            $CPU_loading = 1 - ($GPU_loading_by_CPU - 1);
        }

        // Calculate RAM loading
        if ($GPU_loading_by_RAM - 1 <= 0) {
            $RAM_loading = 1;
        } else {
            $RAM_loading = 1 - ($GPU_loading_by_RAM - 1);
        }

        // Calculate PSU loading
        $PSU_loading =
            (
                $mData['GPU']['part']['power'] +
                $mData['platform']['part']['power'] +
                $mData['RAM']['part']['power']
            ) / $mData['PSU']['part']['PSU_power_supply'] * 100;

        $loadings['GPU'] = ceil($GPU_loading * 100);
        $loadings['CPU'] = ceil($CPU_loading * 100);
        $loadings['RAM'] = ceil($RAM_loading * 100);
        $loadings['PSU'] = ceil($PSU_loading);

        return $loadings;
    }

    /**
     * Calculate temperature of all parts by its loading and specs
     *
     * @param $loadings
     * @param $mData
     * @return array
     */
    private function calculateTemperature($loadings, $mData)
    {
        $GPU = $mData['GPU']['part'];

        $CPU_temperature =
            $loadings['CPU'] * $mData['platform']['part']['TDP'] / 100
            * 0.444 + 32; // HSF ϴca = 0.444

        $RAM_temperature =
            $loadings['RAM'] * $mData['RAM']['part']['TDP'] / 100
            * 10 + 32; // HSF ϴca = 10

        $GPU_temperature =
            $GPU['TDP'] * $loadings['GPU'] / 100 *
            1 / $GPU['GPU_fan_efficiency'] /
            (($GPU['GPU_fans_count'] > 0 ? $GPU['GPU_fans_count'] : 0.4) / 1.5) *
            12.5 + 32; // HSF ϴca depends on fans

        $PSU_temperature =
            $loadings['PSU'] * $mData['PSU']['part']['TDP'] / 100
            * 4 + 32; // HSF ϴca = 4

        $case_temperature = max($CPU_temperature, $RAM_temperature, $GPU_temperature, $PSU_temperature);
        $case_temperature = $case_temperature > 40 ? $case_temperature - 20 : $case_temperature;

        return [
            'CPU_temperature'  => $CPU_temperature,
            'RAM_temperature'  => $RAM_temperature,
            'GPU_temperature'  => $GPU_temperature,
            'PSU_temperature'  => $PSU_temperature,
            'case_temperature' => $case_temperature,
        ];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $processedData = [];
        $time = microtime(true);

        foreach ($this->miningData as $mData) {
            if (
                !$mData['GPU'] ||
                !$mData['platform'] ||
                !$mData['RAM'] ||
                !$mData['PSU'] ||
                !$mData['case']
            ) continue;

            $GPU = $mData['GPU']['part'];

            Log::info($mData['name']);

            /* ----- CPU ----- */
            $CPU_performance = $this->calculate_CPU_performance($mData['platform']['part']);

            /* ----- RAM ----- */
            $RAM_performance = $this->calculate_RAM_preformance($mData['RAM']['part']);

            /* ----- GPU ----- */
            $GPU_hashrate = $this->calculate_GPU_hashrate($GPU);

            Log::info('Max Hashrate: ' . $GPU_hashrate);

            /* --- Loading --- */
            $loadings = $this->calculateLoadings(
                $GPU_hashrate,
                $CPU_performance,
                $RAM_performance,
                $mData
            );

            // Apply GPU loading to change hashrate by CPU loading (in shares - 0-1)
            $GPU_hashrate *= $loadings['GPU'] / 100;

            /* ------------ Temperatures ------------- */
            /* --- (tCase°C - tAmbient°C)/(HSF ϴca) --- */
            $temperatures = $this->calculateTemperature($loadings, $mData);

            $processedData[] = [
                'rig_id'      => $mData['id'],
                'mData'       => $mData,
                'hashrate'    => $GPU_hashrate,
                'GPU_loading' => $loadings['GPU'],
                'CPU_loading' => $loadings['CPU'],
                'RAM_loading' => $loadings['RAM'],
                'PSU_loading' => $loadings['PSU'],
                'CPU_temperature'  => $temperatures['CPU_temperature'],
                'RAM_temperature'  => $temperatures['RAM_temperature'],
                'GPU_temperature'  => $temperatures['GPU_temperature'],
                'PSU_temperature'  => $temperatures['PSU_temperature'],
                'case_temperature' => $temperatures['case_temperature'],
            ];

            Log::info($processedData);
            Log::info('Hashrate: ' . $GPU_hashrate);
            Log::info('GPU Loading: ' . $loadings['GPU'] . '%');
            Log::info("CPU Loading ({$mData['platform']['part']['name']}): " . $loadings['CPU'] . '%');
            Log::info("RAM Loading ({$mData['RAM']['part']['name']}): " . $loadings['RAM'] . '%');
            Log::info('----------------------');
        }

        MiningBreakdownsJob::dispatch();

        Log::info("TIME: " . microtime(true) - $time);
//        Log::info($this->miningData);
    }
}
