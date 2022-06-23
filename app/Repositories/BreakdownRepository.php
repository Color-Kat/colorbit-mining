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
    public function getAllForAdmin() {
        $fields = ['id', 'title', 'condition'];

        $result = $this
            ->startConditions()
            ::select($fields)
            ->get();

        return $result;
    }
}
