<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ActivityAction;
use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategories;
use App\Services\ActivityService;
use App\Services\SlugService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    protected array $msg;
    protected array $log;
    protected string $model = 'App\Models\SubCategories';

    public function index()
    {
        $statues = Status::getArrayDerivatives();

        $subcategories = SubCategories::query()->latest()->paginate(10);

        return Inertia::render('Admin/Subcategory/Index', [
            'subcategories' => $subcategories,
            'statues' => $statues,
        ]);
    }

    public function store(Request $request)
    {
        $this->log = [
            'action' => ActivityAction::CREATED->value,
            'model' => $this->model,
        ];

        DB::beginTransaction();
        try {
            $subcategory = SubCategories::query()->create([
                'name' => $request->name,
                'slug' => SlugService::generate('\App\Models\SubCategories', $request->name),
                'status' => $request->status,
            ]);

            $tractReport = ActivityService::track(
                log: $this->log,
                new_value: $subcategory
            );

            $this->msg['status'] = 'success';
            $this->msg['message'] = 'Subcategory created successfully';

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();

            $this->msg['status'] = 'error';
            $this->msg['message'] = $exception->getMessage();
        }

        return to_route('admin.subcategories.index')
            ->with($this->msg['status'], $this->msg['message']);
    }

    public function update(Request $request, SubCategories $subcategory)
    {
        $this->log = [
            'action' => ActivityAction::UPDATED->value,
            'model' => $this->model,
        ];

        $old_value = $subcategory;

        DB::beginTransaction();
        try {
            $subcategory->update($request->all());
            $tractReport = ActivityService::track(
                log: $this->log,
                new_value: $subcategory,
                old_value: $old_value
            );

            $this->msg['status'] = 'success';
            $this->msg['message'] = 'Subcategory updated successfully';

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();

            $this->msg['status'] = 'error';
            $this->msg['message'] = $exception->getMessage();
        }

        return to_route('admin.subcategories.index')
            ->with($this->msg['status'], $this->msg['message']);
    }

    public function destroy(SubCategories $subcategory)
    {
        $this->log = [
            'action' => ActivityAction::DELETED->value,
            'model' => $this->model,
        ];

        $old_value = $subcategory;

        DB::beginTransaction();
        try {
            $subcategory->delete();
            $tractReport = ActivityService::track(
                log: $this->log,
                new_value: $subcategory,
                old_value: $old_value
            );

            $this->msg['status'] = 'success';
            $this->msg['message'] = 'Subcategory deleted successfully';

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();

            $this->msg['status'] = 'error';
            $this->msg['message'] = $exception->getMessage();
        }

        return to_route('admin.subcategories.index')
            ->with($this->msg['status'], $this->msg['message']);
    }
}
