<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends BaseController
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

    public function buyGood(Request $request) {
        $requestData = $request->all();

        $result = $this->userRepository->buyGood(
            $requestData['shop_slug'],
            $requestData['good_slug']
        );

        return $result;
    }
}
