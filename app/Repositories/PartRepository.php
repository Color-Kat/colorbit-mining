<?php

namespace App\Repositories;

use App\Models\Part;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class PartRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return Part::class;
    }

    /**
     * Return all with paginator
     */
    public function getAllWithPaginator() {
        $result = $this->startConditions()::select(['id', 'name', 'image', 'slug', 'type', 'price'])->orderBy('id', 'DESC')->paginate(10);
        return $result;
    }
}
