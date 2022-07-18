<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MiningProcessCommand extends Command
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
        echo 'We are mining';
        return 0;
    }
}
