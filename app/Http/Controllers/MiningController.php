<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MiningController extends BaseController
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    public function __construct()
    {
        parent::__construct();

        $this->userRepository = new UserRepository();
    }

    public function farm(Request $request) {
        $rigsPaginator = $this->userRepository->getRigsWithPaginator($request);

        return Inertia::render('Mining/Farm', [
            'rigsPaginator' => $rigsPaginator
        ]);
    }

    public function havings(Request $request) {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request);

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
        ]);
    }
}
