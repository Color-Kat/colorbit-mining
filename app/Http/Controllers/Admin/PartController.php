<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\PartRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartController extends AdminBaseController
{
    /**
     * @var PartRepository
     */
    private PartRepository $partRepository;

    public function __construct()
    {
        parent::__construct();

        $this->partRepository = new PartRepository();
    }

    /**
     * Display a listing of the resource with paginator.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $parts = $this->partRepository->getAllWithPaginator();

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Display only videocards (GPU) with paginator.
     *
     * @return \Inertia\Response
     */
    public function GPU()
    {
        $parts = $this->partRepository->getByTypeWithPaginator('GPU');

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Display only platforms with paginator.
     *
     * @return \Inertia\Response
     */
    public function platform()
    {
        $parts = $this->partRepository->getByTypeWithPaginator('platform');

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Display only RAMs with paginator.
     *
     * @return \Inertia\Response
     */
    public function RAM()
    {
        $parts = $this->partRepository->getByTypeWithPaginator('RAM');

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Display only PSUs with paginator.
     *
     * @return \Inertia\Response
     */
    public function PSU()
    {
        $parts = $this->partRepository->getByTypeWithPaginator('PSU');

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Display only cases with paginator.
     *
     * @return \Inertia\Response
     */
    public function case()
    {
        $parts = $this->partRepository->getByTypeWithPaginator('case');

        return Inertia::render('Admin/Parts/Index', [
            'parts' => $parts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
