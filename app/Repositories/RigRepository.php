<?php

namespace App\Repositories;

use App\Jobs\BuyWithDeliveryJob;
use App\Models\Part;
use App\Models\Rig;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class RigRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return Rig::class;
    }

    /**
     * Change rig name by id from request
     *
     * @param Request $request
     * @return array|string[]
     */
    public function changeRigName(Request $request)
    {
        $user = $request->user();

        // Not auth
        if (!$user) return [
            "message" => "Вы не авторизированны",
        ];

        $data = $request->input();

        $result = $this
            ->startConditions()
            ->where('id', $data['id'])
            ->where('user_id', $user->id)
            ->update(['name' => $data['name']]);

        return $result ? [] : ['message' => 'Такого рига не существует'];
    }

    /**
     * ===== MANAGING CONSOLE COMMANDS =====
     * Run actions by data from request (console emulator in front)
     *
     * Action `run all (#rig-1 #rig-2)` - set state to 'on'
     *
     * @param Request $request
     * @return string
     */
    public function console(Request $request)
    {
        $data = $request->input();
        $action = $data['action'];
        $payload = $data['payload'];

        if (!$action) return "Неправильно введена команда.\nВведите `help` для вывода списка команд и описания работы с ними";
        if ($action === 'run') return $this->runRig($payload);

        return "Команда не выполнена. Проверьте правильность ввода команды.\nВведите `help` для справки.";
    }

    /* CONSOLE COMMANDS LIST */

    public function runRig($payload)
    {
        $rigRequest = $this->startConditions(); // Base request

        // Add request by rig name
        if ($payload[0] !== 'all')
            $rigRequest = $rigRequest->whereIn('name', ["#1"]);

        // Update selected rigs
        $rigRequest
            ->where('state', '!=', 'broken')
            ->update([
                'state' => 'on'
            ]);

        // Get selected rigs
        $selectedRigs = $rigRequest
            ->select(['name', 'state'])
            ->get();
        $selectedRigs->appends = [];

        // Get broken and working rigs
        $brokenRigs = $selectedRigs
            ->where('state', 'broken')
            ->pluck('name')
            ->toArray();

        $workingRigs = $selectedRigs
            ->where('state', '!=', 'broken')
            ->pluck('name')
            ->toArray();

        dump($payload, $rigRequest->get()->toArray());

        $result = "";
        if ($brokenRigs)
            $result .=
                "Не удалось запустить майнинг на ригах: " .
                implode(', ', $brokenRigs)
                . ".\n";

        if ($workingRigs)
            $result .= "Майнинг запущен на ригах: " . implode(', ', $workingRigs);
        else $result .= "Не удалось запустить майнинг";

        return $result;
    }
}
