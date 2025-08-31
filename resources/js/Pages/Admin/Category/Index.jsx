import AdminLayout from "@/layouts/AdminLayout.jsx";
import { Link, usePage } from '@inertiajs/react';

export default function CategoryIndex() {

    return (
        <div className="m-4 p-2 bg-white">
            this is category
        </div>
    )
}

CategoryIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>
