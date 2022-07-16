<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HavingsController extends BaseController
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
     * Display havings page with $havings (all types of part)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function havings(Request $request) {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user());
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    /**
     * Display havings page with $havings (only GPUs)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function GPU(Request $request)
    {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user(), 'GPU');
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    /**
     * Display havings page with $havings (only platforms)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function platform(Request $request)
    {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user(), 'platform');
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    /**
     * Display havings page with $havings (only RAMs)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function RAM(Request $request)
    {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user(), 'RAM');
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    /**
     * Display havings page with $havings (only PSUs)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function PSU(Request $request)
    {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user(), 'PSU');
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    /**
     * Display havings page with $havings (only cases)
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function case(Request $request)
    {
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request->user(), 'case');
        $rigIds = $this->userRepository->getRigIds($request->user());

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator,
            'rigIds' => $rigIds
        ]);
    }

    public function changeRigName(Request $request) {
        return redirect()->back();
    }
}
