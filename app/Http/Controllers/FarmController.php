<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmController extends BaseController
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

    /**
     * Display farm page with $rigsPaginator
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function farm(Request $request) {
        $rigsPaginator = $this->userRepository->getRigsWithPaginator($request);

        return Inertia::render('Mining/Farm', [
            'rigsPaginator' => $rigsPaginator
        ]);
    }

    public function changeRigName(Request $request) {
//        dump($request->input());
        return redirect()->back();
    }
}
