import React from 'react';
import {Link} from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <Link href={route('admin.login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login Button
            </Link>

            <h1 className="text-4xl font-bold text-blue-600">Hello from Inertia, React, and Tailwind!</h1>
        </div>
    );
}
