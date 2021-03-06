<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'ziggy' => function () {
                return (new Ziggy)->toArray();
            },

            // It override standard jetStream inertia user object.
            // Code is from vendor/laravel/jetstream/src/Http/Middleware/ShareInertiaData.php
            'user' => function () use ($request) {
                if (! $request->user()) {
                    return null;
                }

                $user = $request->user()->load('role:id,name,slug');

                return array_merge(
                    $user->toArray(),
                    [
                        'two_factor_enabled' => ! is_null($request->user()->two_factor_secret),
                        'isAdmin' => $user->hasRole('admin')
                    ]
                );
            },
        ]);
    }
}
