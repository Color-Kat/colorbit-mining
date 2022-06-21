<?php

namespace App\Repositories;

use App\Models\Breakdown;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class BreakdownRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return Breakdown::class;
    }

    /**
     * Return all with paginator
     */
    public function getAll() {
        $fields = ['id', 'title', 'description', 'chance', 'repair_chance', 'condition'];

        $result = $this
            ->startConditions()
            ::select($fields)
            ->orderBy('id', 'DESC')
            ->get();

        return $result;
    }
}
