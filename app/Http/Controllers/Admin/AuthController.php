<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected array $message;

    public function __construct()
    {
        $this->message = [];
    }

    public function login()
    {
        if (Auth::guard('admin')->check()) {
            return to_route('admin.dashboard');
        }

        return Inertia::render('Admin/Auth/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->remember_me; // ✅ ensures true/false

        if (Auth::guard('admin')->attempt($credentials, $remember)) {
            $request->session()->regenerate();

            return to_route('admin.dashboard');
        }

//        return Inertia::render('Admin/Auth/Login', [
//            'request' => $request->all(),
//            'message' => [
//                'type' => 'error',
//                'message' => 'Invalid credentials. Please try again.'
//            ]
//        ]);
    }

    public function logout(Request $request)
    {
        // Log out the admin
        Auth::guard('admin')->logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate CSRF token to prevent session fixation
        $request->session()->regenerateToken();

        // Redirect to admin login page
        return to_route('admin.login');
    }
}
