<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login() {
        return Inertia::render('Admin/Auth/Login');
    }
}
