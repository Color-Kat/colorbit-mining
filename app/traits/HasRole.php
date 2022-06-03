<?php

namespace App\traits;

use App\Models\Role;

/**
 * Trait HasRole
 *
 * One to many inverse relationship for using roles
 */

trait HasRole
{
    /**
     * @return mixed
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * @param mixed ...$roles
     * @return bool
     */
    public function hasRole(... $roles ) {
        foreach ($roles as $role) {
            if ($this->role && $this->role->slug === $role) {
                return true;
            }
        }
        return false;
    }
}
