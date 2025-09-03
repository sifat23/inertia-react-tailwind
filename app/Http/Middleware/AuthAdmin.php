<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the admin is authenticated
        if (!Auth::guard('admin')->check()) {

            return to_route('admin.login');
        }

        return $next($request);
    }
}
