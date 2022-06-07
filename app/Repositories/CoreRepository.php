<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class CoreRepository
 *
 * @package App\Repositories
 *
 * Repository can get some data from model.
 * Can't to create or change data in model.
 */

abstract class CoreRepository
{
    /**
     * @mixin Builder|Model
     */
    protected Builder|Model $model;

    public function __construct()
    {
        $this->model = app($this->getModelClass());
    }

    /**
     * Define model class
     *
     * @return string
     */
    abstract protected function getModelClass(): string;

    /**
     * @return Builder|Model
     */
    protected function startConditions(): Builder|Model {
        // Clone model to don't save model state
        return clone $this->model;
    }
}
