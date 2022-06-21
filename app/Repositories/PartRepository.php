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
        $result = $this->startConditions()::select(['id', 'name', 'vendor', 'image', 'slug', 'type', 'price'])->orderBy('id', 'DESC')->paginate(10);
        return $result;
    }

    /**
     * Return all parts by type with paginator
     */
    public function getByTypeWithPaginator(string $type) {
        $select = ['id', 'name', 'vendor', 'image', 'slug', 'type', 'price'];

        $result = $this->startConditions()::select($select)
            ->where('type', $type)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return $result;
    }


}
