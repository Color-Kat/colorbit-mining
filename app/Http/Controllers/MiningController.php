<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MiningController extends Controller
{
    public function farm() {
        return Inertia::render('Mining/Farm');
    }

    public function havings() {
        return Inertia::render('Mining/Havings');
    }
}
