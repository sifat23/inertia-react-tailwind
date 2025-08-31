<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Category/Index');
    }
}
