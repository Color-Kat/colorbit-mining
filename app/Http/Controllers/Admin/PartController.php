<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PartStoreRequest;
use App\Http\Requests\PartUpdateRequest;
use App\Models\Part;
use App\Repositories\BreakdownRepository;
use App\Repositories\PartRepository;
use App\Repositories\ShopRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartController extends AdminBaseController
{
    /**
     * @var PartRepository
     */
    private PartRepository $partRepository;

    /**
     * @var BreakdownRepository
     */
    private BreakdownRepository $breakdownRepository;

    /**
     * @var ShopRepository
     */
    private ShopRepository $shopRepository;

    public function __construct()
    {
        parent::__construct();

        $this->partRepository = new PartRepository();
        $this->breakdownRepository = new BreakdownRepository();
        $this->shopRepository = new ShopRepository();
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
     * @return \Inertia\Response
     */
    public function create()
    {
        $breakdowns = $this->breakdownRepository->getAllForAdmin();
        $shops = $this->shopRepository->getAllForAdmin();

        return Inertia::render('Admin/Parts/Create', [
            'breakdowns' => $breakdowns,
            'shops' => $shops
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PartStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(PartStoreRequest $request)
    {
        dd($request->all());
        $this->partRepository->createPart($request);

        return redirect()->back();
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
     * @param  int $id
     * @return \Inertia\Response
     */
    public function edit(int $id)
    {
        $part = $this->partRepository->getForEdit($id);
        $breakdowns = $this->breakdownRepository->getAllForAdmin();
        $shops = $this->shopRepository->getAllForAdmin();

        return Inertia::render('Admin/Parts/Edit', [
            'part' => $part,
            'breakdowns' => $breakdowns,
            'shops' => $shops
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\PartUpdateRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        dd($request->all());
        $this->partRepository->editPart($request, $id);

//        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Part $part)
    {
        dump($part);

        return redirect()->back();
    }
}
