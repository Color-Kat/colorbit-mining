<?php

namespace App\Console\Commands;

use App\Jobs\ApplyMiningDataJob;
use App\Jobs\GetMiningDataJob;
use App\Jobs\ProcessMiningDataJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;

class MiningRunCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mining:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run mining process: by rig data change rigs table, havings, users.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info('command');
        GetMiningDataJob::dispatch();
    }
}
