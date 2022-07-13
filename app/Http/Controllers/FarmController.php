<?php

namespace App\Http\Controllers;

use App\Repositories\RigRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmController extends BaseController
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @var RigRepository
     */
    private RigRepository $rigRepository;

    public function __construct()
    {
        parent::__construct();

        $this->userRepository = new UserRepository();
        $this->rigRepository = new RigRepository();
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

    /**
     * Change name of rig by id
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function changeRigName(Request $request) {
        $result = $this->rigRepository->changeRigName($request);

        return redirect()->back()->withErrors($result);
    }

    /**
     * Run console command from frontend
     *
     * @param Request $request
     * @return string
     */
    public function console(Request $request) {
        $result = $this->rigRepository->console($request);

        return $result;
    }
}
