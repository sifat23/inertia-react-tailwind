<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\SlugService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $statues = Status::getArrayDerivatives();

        $categories = Category::query()->latest()->paginate(10);

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
            'statues' => $statues,
        ]);
    }

    public function store(Request $request)
    {
        Category::query()->create([
            'name' => $request->name,
            'slug' => SlugService::generate('\App\Models\Category', $request->name),
            'status' => $request->status,
        ]);

        return to_route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function update(Request $request, Category $category)
    {
        $category->update($request->all());

        return to_route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
