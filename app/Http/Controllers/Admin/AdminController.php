<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Index');
    }

    /**
     * Show page with change user's balance form
     *
     * @return \Inertia\Response
     */
    public function changeBalancePage() {
        return Inertia::render('Admin/ChangeBalance');
    }

    /**
     * Change user's balance by user's id
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function changeBalance(Request $request) {
        $id = $request->get('userId');
        $balance = $request->get('balance');

        User::where('id', $id)->update([
            'money' => $balance
        ]);

        return redirect()->back();
    }
}
