<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login() {
        return Inertia::render('Admin/Auth/Login');
    }

    public function store(Request $request) {
        return Inertia::render('Admin/Auth/Login', [
            'request' => $request->all(),
        ]);
    }
}
