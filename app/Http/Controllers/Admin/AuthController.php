<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected array $message;

    public function login() {
        return Inertia::render('Admin/Auth/Login');
    }

    public function store(Request $request) {

        $credentials = $request->all();

        try {
            if (Auth::guard('admin')->attempt($credentials, $request->remember)) {
                $request->session()->regenerate();
                return redirect()->intended(route('admin.dashboard')); // Redirect to admin dashboard
            }
        } catch (\Exception $e) {
            $this->message['type'] = 'error';
            $this->message['message'] = $e->getMessage();
        }



        return Inertia::render('Admin/Auth/Login', [
            'request' => $request->all(),
            'message' => $this->message
        ]);
    }
}
