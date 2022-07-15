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
        if ($action === 'run') return $this->toggleRig('on', $payload);
        if ($action === 'stop') return $this->toggleRig('off', $payload);
        if ($action === 'status') return $this->rigStatus($payload);

        return "Команда не выполнена. Проверьте правильность ввода команды.\nВведите `help` для справки.";
    }

    /* CONSOLE COMMANDS LIST */

    public function toggleRig($state, $payload)
    {
        $rigRequest = $this->startConditions(); // Base request

        // Add request by rig name
        if ($payload && $payload[0] != 'all')
            $rigRequest = $rigRequest->whereIn('name', $payload);

        // Update selected rigs
        $updateRequest = clone $rigRequest;
        $updateRequest
            ->where('state', '!=', 'broken')
            ->update([
                'state' => $state
            ]);

        // Get selected rigs
        $selectedRigs = $rigRequest
            ->select(['name', 'state'])
            ->get();
//        $selectedRigs->appends = [];

        // Get broken and working rigs
        $brokenRigs = $selectedRigs
            ->where('state', 'broken')
            ->pluck('name')
            ->toArray();

        $workingRigs = $selectedRigs
            ->where('state', '!=', 'broken')
            ->pluck('name')
            ->toArray();

        $result = ""; // Result message

        // Add to result non-existent rigs
        $foundRigs = $selectedRigs->pluck('name')->toArray();
        if ($payload[0] != 'all' && $foundRigs !== $payload)
            $result .= 'Несуществующий идентификатор рига: ' . implode(
                    ', ',
                    array_diff($payload, $foundRigs)
                ) . ".\n";

        // Return message for off rigs
        if ($state === 'off') {
            if ($foundRigs) return $result . "Майнинг остановлен на ригах: " . implode(', ', $foundRigs);
            else return $result;
        }

        // Message for broken rigs
        if ($brokenRigs)
            $result .=
                "Не удалось запустить майнинг на ригах: " .
                implode(', ', $brokenRigs) . ".\n";

        // Message with names of working rigs
        if ($workingRigs)
            $result .= "Майнинг запущен на ригах: " . implode(', ', $workingRigs);
        // No rigs are working
        else $result .= "Не удалось запустить майнинг";

        $result .= "\nВведите `mining state` для получения подробной информации.";

        return $result;
    }

    public function rigStatus($payload)
    {
        // Base request
        $rigRequest = $this
            ->startConditions()
            ->select(['name', 'state', 'GPU_id', 'platform_id', 'RAM_id', 'PSU_id', 'case_id']);

        // Add request by rig name
        if ($payload && $payload[0])
            $rigRequest = $rigRequest->whereIn('name', $payload);

        // Get selected rigs
        $rigs = $rigRequest
            ->get()
            ->toArray();

        $result = ""; // Result message

        foreach ($rigs as $rig) {
            $header = "\n========== Риг " . $rig['name'] . " ==========\n";

            $result .= "\n" . str_repeat("=", mb_strlen($header) - 2) . "\n";
            $result .= $header;
            $result .= "\n" . str_repeat("=", mb_strlen($header) - 2) . "\n";

            $result .= "Риг " . $rig['name'] . " - " . ($rig["state"] === "broken" ? 'неисправен' : 'исправен') . "\n";
            $result .= "Детали: \n";

            if(count($rig['breakdowns']) == 0) $result .= "Комплектующие не установлены.\n";

            foreach ($rig['breakdowns'] as $breakdown) {

                $result .=
                    "---------------------\n" .
                    "[" . $breakdown["id"] . "] " .
                    $breakdown["part"]["name"] . " - " .
                    ($breakdown["state"] === "broken" ? 'неисправно' : 'исправно') . "\n";

                if (!is_null($breakdown['message']))
                    $result .= "[" . $breakdown['message'] . "]\n";

                if (!is_null($breakdown["temp"]))
                    $result .= "Текущая температура: " . $breakdown["temp"] . "°C\n";

                if (!is_null($breakdown["max_temp"]))
                    $result .= "Макс. зафиксированная температура: " . $breakdown["max_temp"] . "°C\n";

                if (!is_null($breakdown["loading"]))
                    $result .= "Загрузка: " . $breakdown["loading"] . "%\n";

                $result .= "---------------------\n";
            }

        }

//        dump($rigs);

        // Add to result non-existent rigs
        $foundRigs = $rigRequest->pluck('name')->toArray();
        if ($payload && $payload[0] != 'all' && $foundRigs !== $payload)
            $result .= 'Несуществующий идентификатор рига: ' . implode(
                    ', ',
                    array_diff($payload, $foundRigs)
                ) . ".\n";

        return $result;
    }
}
