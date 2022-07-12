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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request);

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request, 'GPU');

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request, 'platform');

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request, 'RAM');

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request, 'PSU');

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
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
        $havingsPaginator = $this->userRepository->getHavingsWithPaginator($request, 'case');

        return Inertia::render('Mining/Havings', [
            'havings' => $havingsPaginator
        ]);
    }

    public function changeRigName(Request $request) {
        dump($request->input());
        return redirect()->back();
    }
}
